const nodemailer = require("nodemailer");
const {NO_REPLY_EMAIL, NO_REPLY_PASSWORD, FRONTEND_URL} = require("../configs/config");
const emailTemplates = require('../emailTemplates');
const EmailTemplatesLib = require('email-templates');
const path = require('path')
const {ApiError} = require("../errors");

const sendEmail = async (userMail, emailAction, locals) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: NO_REPLY_EMAIL,
            pass: NO_REPLY_PASSWORD
        }
    })
    console.log(path.join(process.cwd(), 'emailTemplates'), 'process cwd');
    console.log(emailTemplates[emailAction],'emailTemplates')

    const templateParser = new EmailTemplatesLib({
        views: {
            root: path.join(process.cwd(), 'emailTemplates')
        }
    });
    const emailInfo = emailTemplates[emailAction];
    console.log(emailInfo.templateName, 'templateName')

    if (!emailInfo){
        throw new ApiError('wrong template name', 500)
    }
    console.log(locals, 'locals')
    const html = await templateParser.render(emailInfo.templateName, {...locals, frontendUrl: FRONTEND_URL})

    return transporter.sendMail({
        from: 'No reply nodejs hw',
        to: userMail,
        subject: emailInfo.subject,
        html
    })
}

module.exports = {
    sendEmail
}