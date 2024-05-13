const express = require("express");
const { mwToken } = require("../middlewares/auth");
const router = express.Router();
const xlsx = require('xlsx');
const { getOneCamp } = require("../BL/campaign.service");
const multer = require('multer');
const { addLeadToCamp } = require("../BL/lead.service");
const upload = multer({ storage: multer.memoryStorage() });

const convertExtra = ([key, value]) =>
  [`Extra ${value?.he || key}`, typeof value === 'object' ? value?.value : String(value)]

const convertDataToBuffer = (data) => {
  // Create a new workbook and worksheet
  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.json_to_sheet(data);
  // Add the worksheet to the workbook
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Leads');
  // Generate the Excel file buffer
  const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  return excelBuffer
}

const convertLeadsToExcelFormat = (leads) => leads.map((lead) => ({
  'שם מלא': lead.fullName || lead.name,
  'מייל': lead.email,
  'טלפון': lead.phone,
  'הודעות': lead.notes,
  'תאריך הצטרפות': (typeof lead.joinDate === 'string' ? new Date(lead.joinDate) : lead.joinDate).toISOString().slice(0, 10),
  'פעיל': Boolean(lead.isActive) ? 'כן' : 'לא',
  ...Object.fromEntries(
    Object.entries(
      typeof lead.extra === 'object' ? lead.extra : JSON.parse(lead.extra || '{}')
    ).map(convertExtra)
  ),
}));

router.get("/download/leads/:campaignId", mwToken, async (req, res) => {
  try {
    const campaign = await getOneCamp(req.params.campaignId);
    if (!campaign) throw { code: 404, msg: "Campaign is not exist" };

    const data = convertLeadsToExcelFormat(campaign.leads);
    const excelBuffer = convertDataToBuffer(data)

    // Set the response headers for file download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${encodeURIComponent(`leads-${campaign.title}.xlsx`)}`);

    res.send(excelBuffer);
  } catch (err) {
    console.log({ err });
    res
      .status(err.code || 500)
      .send({ msg: err.msg || "something went wrong" });
  }
});

// upload/leads - העלאת קובץ CSV 
router.post("/download/leads", mwToken, async (req, res) => {
  try {
    const data = convertLeadsToExcelFormat(req.body);
    const excelBuffer = convertDataToBuffer(data)

    // Set the response headers for file download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${encodeURIComponent(`leads.xlsx`)}`);

    res.send(excelBuffer);
  } catch (err) {
    console.log({ err });
    res
      .status(err.code || 500)
      .send({ msg: err.msg || "something went wrong" });
  }
});

router.post('/upload/leads/:campaignId', upload.single('file'), mwToken, async (req, res) => {
  try {
    if (!req.file) throw ({ code: 400, msg: 'No file uploaded' });
    const excelBuffer = req.file.buffer;
    const leads = await convertExcelToLeads(excelBuffer);
    await Promise.all(leads.map((lead) => addLeadToCamp(req.params.campaignId, req.body?.user?._id, lead)));
    res.send({ msg: 'Leads uploaded successfully' });
  } catch (err) {
    console.log({ err });
    res.status(err.code || 500).send({ msg: err.msg || 'Something went wrong' });
  }
});


const convertExcelToLeads = async (excelBuffer) => {
  try {
    const workbook = xlsx.read(excelBuffer, { type: 'buffer' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    const headers = data.shift();

    const leads = data.map(row => {
      const lead = {};

      headers.forEach((header, index) => {
        switch (header) {
          case 'שם מלא':
            lead.fullName = row[index];
            break;
          case 'מייל':
            lead.email = row[index];
            break;
          case 'טלפון':
            lead.phone = row[index];
            break;
          case 'הודעות':
            lead.notes = row[index];
            break;
          case 'תאריך הצטרפות':
            lead.joinDate = new Date(row[index]);
            break;

          default:
            if (header.startsWith('Extra ')) {
              const key = header.slice(6);
              const value = row[index];
              lead.extra = { ...lead.extra, [key]: { he: key, value } };
            }
        }
      });
      return lead;
    }).filter(l => l['phone']);

    return leads;
  } catch (err) {
    console.error('Error converting Excel to leads:', err);
    throw err;
  }
};

module.exports = router;