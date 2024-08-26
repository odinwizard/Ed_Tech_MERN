const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender.util");

const otpSchema = new mongoose.Schema({
    email: {
        type:String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5*60,
    }
});

//here is the function which is dedicated for send mail
async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(email,"Verification Mail From StudyNotion", otp);
        console.log("Email send sucessfully", mailResponse);
    } catch (error) {
        console.log(`Email verification error: ${error}`);
        throw error;
    }
}

otpSchema.pre("save", async function(next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
})

module.exports = mongoose.model("Otp", otpSchema);