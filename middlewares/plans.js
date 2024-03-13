// middleware עבור חבילות
// יש לזהות חבילת הלקוח
//  בדיקה מול טבלת חבילות האם תואם לחבילה
// אם לא - להחזיר קוד מוסכם שנגמרה החבילה


//TODO --- missing data FOR A FREE PLAN 
// data_transfer_crm 
//split_terminals
//notification_new_lead
//copywriting_msg
//connection_to_whatsApp 
//customer_journey
//technical_support
//update_version
// max lead (ALL)

const express = require('express')
const db = require('../DL/db')

const app = express();
db.connect();
const { getOneUserByFilter } = require('../BL/account.service')
const { readOne } = require('../DL/controllers/plan.controller')


async function maxCamp(req, res, next) {
    try {
        const user = await getOneUserByFilter({ id: "65eeca187d0944e92ab44179" },"subscription");
        if (!user) throw { code: 401, msg: " user not found " }
        if (user.campaigns < user.subscription.num_leads_in_list) {
            return next()
        }
        res.status(444).send("there is no permission for this operate")
    } catch (err) {
        res
            .status(err.code || 500)
            .send({ msg: err.msg || "no permission / you over the limit to this plan " });
    }

}
// function isThirtyDaysBefore(date) {
//     const currentDate = new Date();
//     const thirtyDaysBefore = new Date(currentDate);
//     // Subtract 30 days from the current date
//     thirtyDaysBefore.setDate(currentDate.getDate() - 30);
//     // Compare the given date with the calculated date
//     return date.toDateString() === thirtyDaysBefore.toDateString();
//   }
//   // Example usage
//   const someDate = new Date('2023-06-01');
//   console.log(isThirtyDaysBefore(someDate));


async function maxWellcomeMsg(req, res, next) {
    try {

    } catch (err) {
        res
            .status(err.code || 500)
            .send({ msg: err.msg || "no permission /You are not allowed to perform this action , sorry" });
    }
}


async function totalMsg(req, res, next) {
    try {

    } catch (err) {
        res
            .status(err.code || 500)
            .send({ msg: err.msg || "no permission /You are not allowed to perform this action , sorry" });
    }
}



async function transferData(req, res, next) {
    try {
        const user = await getOneUserByFilter({ id: req.body.user._id },'subscription','subscription');
        if (!user) throw { code: 401, msg: " user not found " };
        if (user.subscription.data_transfer_crm == true) {
            return next()
        }

    } catch (err) {
        res
            .status(err.code || 500)
            .send({ msg: err.msg || "no permission /You are not allowed to perform this action , sorry " });
    }
}


async function splitTerminals(req, res, next) {
    try {
        const user = await getOneUserByFilter({ id: req.body.user._id },'subscription');
        if (!user) throw { code: 401, msg: " user not found " };
        if (user.subscriptionsplit_terminals == true) {
            return next()
        }

    } catch (err) {
        res
            .status(err.code || 500)
            .send({ msg: err.msg || "no permission /You are not allowed to perform this action , sorry" });
    }
}


async function notificationForNewLead(req, res, next) {
    try {
        const user = await getOneUserByFilter({ id: req.body.user._id },'subscription');
        if (!user) throw { code: 401, msg: " user not found " };
        if (user.subscriptionnotification_new_lead == true) {
            return next()
        }
    } catch (err) {
        res
            .status(err.code || 500)
            .send({ msg: err.msg || "no permission /You are not allowed to perform this action , sorry " });
    }
}


async function msgCopywriting(req, res, next) {
    try {
        const user = await getOneUserByFilter({ id: req.body.user._id },'subscription');
        if (!user) throw { code: 401, msg: " user not found " };
        if (user.subscriptioncopywriting_msg == true) {
            return next()
        }

    } catch (err) {
        res
            .status(err.code || 500)
            .send({ msg: err.msg || "no permission /You are not allowed to perform this action , sorry " });
    }
}



async function whatsAppConnection(req, res, next) {
    try {
        const user = await getOneUserByFilter({ id: req.body.user._id },'subscription');
        if (!user) throw { code: 401, msg: " user not found " };
        if (user.subscriptionconnection_to_whatsApp == true) {
            return next()
        }
    } catch (err) {
        res
            .status(err.code || 500)
            .send({ msg: err.msg || "no permission /You are not allowed to perform this action , sorry" });
    }
}



async function journeyForClient(req, res, next) {
    try {
        const user = await getOneUserByFilter({ id: req.body.user._id },'subscription');
        if (!user) throw { code: 401, msg: " user not found " };
        if (user.subscriptioncustomer_journey == true) {
            return next()
        }
    } catch (err) {
        res
            .status(err.code || 500)
            .send({ msg: err.msg || "no permission /You are not allowed to perform this action , sorry" });
    }
}


module.exports = {
    maxCamp,
    transferData,
    splitTerminals,
    notificationForNewLead,
    msgCopywriting,
    whatsAppConnection,
    journeyForClient


}


