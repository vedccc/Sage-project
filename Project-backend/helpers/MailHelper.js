const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports.sendEmail = function (to, subject, html) {
    return new Promise(function (resolve, reject) {
        const formsection = {
            name: "Proaxiom Contact",
            email: process.env.SEND_EMAIL_FROM,
        }
        const msg = {
            to: to, // Change to your recipient
            from: formsection, // Change to your verified sender
            subject: subject,
            html: html,
        }

        sgMail
            .send(msg)
            .then((response) => {
                resolve(true)
                // console.log("aaaaaaaa-----",response)
                // console.log(response[0].headers)
            })
            .catch((error) => {
                resolve(false)
                // console.error("email errrr----",error)
            })
    });
};