const mongoose = require('mongoose');

async function connect() {
    // connect : msg
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB - connection succeeded")
    } catch (error) {
        console.log("MongoDB Error: ", error);
    }
}

module.exports = {connect}
