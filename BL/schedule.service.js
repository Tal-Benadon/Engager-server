const schedule = require('node-schedule');
const moment = require('moment-timezone');

function scheduleFunctionAtSpecificDate(cb, targetDate) {
    const job = schedule.scheduleJob(targetDate, cb);
    return job;
}

function convertToDateAndExec(dateData, functionToExec) {
    const timeZone = 'Asia/Jerusalem';
    const targetDate = moment.tz(dateData, timeZone).toDate();
    try {
        executeFunctionAtSpecificDate(() => {
            functionToExec()
        }, targetDate, timeZone);
    } catch (error) {
        console.log(error);
    }
}

function executeFunctionAtSpecificDate(callback, targetDate, timezone) {
    const timeZone = 'Asia/Jerusalem';
    const targetTime = moment.tz(targetDate, timeZone);
    const delayInMillis = targetTime - moment();

    const job = scheduleFunctionAtSpecificDate(callback, new Date(Date.now() + delayInMillis));
}



module.exports = { convertToDateAndExec };










// job.cancel() - will be used to cancel a recurring job
