const nodemailer = require("nodemailer");

//mail function......................................
const mailSender = async (email, title, body) => {
    try {
            let transporter = nodemailer.createTransport( { //we create a trasporter
                host: process.env.MAIL_HOST,
                auth:{
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                }
            })
            //send mail function.................
            let info = await transporter.sendMail({
                from:'StudyNotion@codehelp.com',
                to:`${email}`,
                subject:`${title}`,
                html:`${body}`
            })
            console.log(info);
            return info;

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = mailSender;