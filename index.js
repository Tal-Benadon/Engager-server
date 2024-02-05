require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = 2500
const campaignRouter = require('./routes/campaign.router');
const leadRouter = require('./routes/lead.router');
const userRouter = require("./routes/user.router");
const db = require('./DL/db')

const app = express();
db.connect();

app.use(cors());
app.use(express.json());

app.use('/campaign', campaignRouter);
app.use('/lead', leadRouter);
app.use('/user', userRouter)

// {"data":{"name":"aryeh", "email":"aryeh@gmil.com","phone":"0524888842","notes":"","campaign":""}}
// {"data":{"name":"hotam", "email":"hotam@gmail.com","phone":"0584477218","notes":"","campaign":""}}
// {"data":{"name":"maayan", "email":"maayan@gmail.com","phone":"0585855237","notes":"","campaign":""}}


app.listen(PORT, () => console.log(`****server is listening on ${PORT}****`))