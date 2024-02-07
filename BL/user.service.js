
const userController = require("../DL/controllers/user.controller");


// get all users
async function getUsers() {
  let users = await userController.read()
  console.log("s", users)
  if (!users) {
    throw { code: 408, msg: 'something went wrong' }
  }
  return users
}

// get one user:
async function getOneUser(phone) {
  let user = await userController.readOne({ phone: phone })
  // console.log("s", user)
  if (!user) {
    throw { code: 408, msg: 'The phone is not exist' }
  }
  return user
}

// delete user:
async function del(phone) {
  let user = await userController.update({ phone, isActive: true })
  if (!user) {
    throw { code: 408, msg: 'The phone is not exists' }
  }
  return user
}

// update one user:
async function updateOneUser(phone, data) {
  let user = await userController.updateUser({ phone: phone }, data)
  if (!user) {
    throw { code: 408, msg: 'The phone is not exists' }
  }
  return user
}

// סיום תקופת נסיון ושינוי הסבסקרפשן ל-אקספרייד
async function endOfTrialPeriod(userPhone){
  const user = await userController.readOne({phone: userPhone});
  const subscription = user.subscription;
  if(subscription == 'trial'){
    const updated = userController.updateUser(userPhone, {subscription: 'expired'});
    if (!updated) throw { code: 408, msg: 'The phone is not exists' }
    throw {code: 403, msg: 'end of trial period'}
  }
}

//add new user :
async function createNewUser(body) {

    // קוד ליצירת תקופת נסיון
        // let createdDate = new Date(); // משתנה לשמירת הזמן הנוכחי
        // const expiredDate = new Date(createdDate); // יצירת תאריך חדש על בסיס הזמן הנוכחי
        // expiredDate.setDate(expiredDate.getDate() + 14);
    // talFunction(expiredDate, endOfTrialPeroid(body.phone));
        //  יש תאריך יצירה גם בסכמה והשאלה אם לבדוק אחרי שבועיים לפי מה שכתוב שם או לפי מה שעשיתי כבר
        // if (createdDate.getTime() === expiredDate.getTime()) console.log('timeFinisf');
  var passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
  var phoneRegex = /^(?:0(?:[23489]|[57]\d)-\d{7})|(?:0(?:5[^7]|[2-4]|[8-9])(?:-?\d){7})$/;
  const phoneIsexists = await userController.readOne({ phone: body.phone });
  if (phoneIsexists) {
    throw { code: 408, msg: 'This phone already exists' };
  }
  let email = body.email
  let phone = body.phone
  let password = body.password
  if (!email.includes("@") || !email.includes(".")) throw { code: 408, msg: 'Email is not proper' }
  if (!phoneRegex.test(phone)) throw { code: 408, msg: 'Phone is not proper' }
  if (password.length < 8) throw { code: 408, msg: 'The password does not contain at least 8 characters' }
  if (!passwordRegex.test(password)) throw { code: 408, msg: 'The password does not contain at least 1 leter and 1 number' }
  // האם צריך לשלוח ביצירה דיקסקרפשן של תקופת נסיון או שיש לו אופציה ישר להרשם?
  const newUser = await userController.create({ ...body });
  return newUser
}

module.exports = { createNewUser, getUsers, getOneUser, del, updateOneUser }
