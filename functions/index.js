const functions = require('firebase-functions')
const admin = require("firebase-admin")
const nodemailer = require('nodemailer');
admin.initializeApp()

exports.sendMailOverHTTP = functions
    .runWith({ secrets: ["APP_PASS"] })
    .region('europe-west1')
    .https
    .onRequest((req, res) => {
        /* gmail  credentials */
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'vc.zavathzaventem@gmail.com',
                pass: process.env.SECRET_NAME
            }
        });
        const allowedOrigins = ['https://vczavath-5f99f.web.app', 'https://vczavath.be', 'https://www.vczavath.be'];
        const origin = req.headers.origin;
        if (allowedOrigins.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
        res.set('Access-Control-Allow-Methods', 'POST')
        if (req.method === "OPTIONS") {
            // stop preflight requests here (preflight cors request)
            res.status(204).send('');
            return;
        }
        const mailOptions = {
            from: `${req.body.email}`,
            replyTo: `${req.body.email}`,
            to: `vc.zavathzaventem@gmail.com,${req.body.email}`,
            subject: `${req.body.subject}`,
            html: `
        <h1>Contact VC Zavath</h1>
        <h2>Bericht:</h2>
        ${req.body.message}
        <br>
        <h2>Contact informatie</h2>                    
        <p>Email: ${req.body.email}</p>
        <p>Naam: ${req.body.name}</p>
        <p>Nummer: ${req.body.phoneNumber}</p>`
        };
        return transporter.sendMail(mailOptions, (error, data) => {
            if (error) {
                return res.send(error.toString());
            }
            var data = JSON.stringify(data)
            return res.send(`Sent! ${data}`);
        })
    });