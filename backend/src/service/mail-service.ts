const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

class MailService {
    private transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD
            }
        })
    }
    async sendRecoveryMail(targetAddress: string, temporaryCode: string | number) {
        await this.transporter.sendMail({
            from: 'Gooo online store <govorov.business@gmail.com>',
            to: targetAddress,
            subject: "Recovery account",
            html: `
                <div style="padding: 5px; border-radius: 5px; border: 1px solid black; height: auto; width: 400px; box-shadow: 0 0 3px black">
                    <p style="margin: 0; padding: 0">Please do not transfer the following code. Via this <span style="font-weight: bold">whoever</span> can access your account</p>
                    <br><br>
                    <p style="margin: 0; padding: 0"><span style="font-weight: bold">Enter code</span> to the input form on the site.</p>
                    </div>
                <h1>${temporaryCode}</h1>
            `
        })
    }

    async sendActivationMail(targetAddress: string, link: string) {
        await this.transporter.sendMail({
            from: 'Gooo online store <govorov.business@gmail.com>',
            to: targetAddress,
            subject: "Hello! Gooo online store glad to meet you!",
            html: `
                <div style="padding: 5px; border-radius: 5px; border: 1px solid black; height: auto; width: 400px; box-shadow: 0 0 3px black">
                    <p style="margin: 0; padding: 0">Hi, enter the followind code on the website to confirm. And start to get goods at least everyday^.</p>
                    <br><br>
                    <p style="margin: 0; padding: 0">We are waiting for you</p>
                    </div>
                <a href=${link}>${link}</a>
            `
        })
    }
}

module.exports = new MailService();