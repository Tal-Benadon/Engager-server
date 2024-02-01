require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 2500

const db = require('./DL/db')
db.connect();

const cors = require('cors');
app.use(cors());
app.use(express.json());

const campaignRouter = require('./routes/campaign.router');
app.use('/campaign', campaignRouter);
const leadRouter = require('./routes/lead.router');
app.use('/lead', leadRouter);


app.listen(PORT, () => console.log(`****server is listening on ${PORT}****`))