const campaignRouter = require('./campaign.router');
const leadRouter = require('./lead.router');
const msgRouter = require('./msg.router');
const userRouter = require("./user.router");
const loginRouter = require("./login.router");
const webhookRouter = require("./webhook.router")
const paymentRouter = require("./payment.router")
const accountRouter = require('./account.router');
const adminRouter = require('./admin.router');
const apiRouter = require ('./api.router');
const fileRouter = require( './file.router');
const whatsAppArouter = require('./whatsApp.router');

const mainRouter=()=>{

app.use('/campaign', campaignRouter);
app.use('/campaign', msgRouter);
app.use('/lead', leadRouter);
app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/webhook', webhookRouter)
app.use('/payment', paymentRouter);
app.use('/accout' , accountRouter);
app.use('/admin' , adminRouter)
app.use('/api' , apiRouter)
app.use('/files' , fileRouter)
app.use('/whatsapp' , whatsAppArouter)
}
module.exports = {mainRouter}