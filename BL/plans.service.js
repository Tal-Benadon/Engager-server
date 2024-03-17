//TODO 
// חבילות משתמש 

const { update } = require("../DL/controllers/campaign.controller");
const userController = require("../DL/controllers/user.controller");
const planController = require("../DL/controllers/plan.controller")

// סיום תקופת נסיון ושינוי הסבסקרפשן ל-אקספרייד
async function endOfTrialPeriod(phone) {
    const user = await userController.readOne({ phone: phone });
    const subscription = user.subscription;
    let updatedUser;
    if (subscription == 'trial') {
        updatedUser = userController.updateUser({ phone: phone }, { subscription: 'expired' });
    }
    return updatedUser
}

async function readPlan(){
    return await planController.read()
}
async function readPlanOne(){
    return await planController.readOne()
}

module.exports = {
    readPlan,
    readPlanOne
  };
  
