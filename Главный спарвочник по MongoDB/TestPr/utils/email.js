const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        post: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: "Jonas Main <hi@gmail.com>",
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html:
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;