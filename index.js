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


app.listen(PORT, () => console.log(`****server is listening on ${PORT}****`))