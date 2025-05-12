import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import __dirname from './utils.js';

const app = express();

dotenv.config(); //Nos permitirá trabajar con las variables de entorno del archivo ".env"

//Leer y almacenar las variables de entorno
const PORT = process.env.APP_PORT;
const mailService = process.env.MAIL_SERVICE;
const mailPort = process.env.MAIL_PORT; 
const mailFrom = process.env.MAIL_FROM;
const mailPass = process.env.MAIL_PASS;
const mailHost = process.env.MAIL_HOST;

const transport = nodemailer.createTransport({
    service: mailService,
    host: mailHost,
    port: mailPort, //587 puerto por default de GMAIL - Se encuentra como puerto SMTP
    auth: {
        user: mailFrom,
        pass: mailPass
    }
})

app.get('/mail', async (req, res) => {
    try{
        let result = await transport.sendMail({
            from: mailFrom,
            to: mailFrom,
            subject: "Correo de prueba",
            html: `
                <div>
                    <h1>¡Esto es un test!</h1>
                    <img src="cid:perrito1">
                </div>
            `,
            attachments : [
                {
                    filename: 'documento.pdf',
                    path: __dirname + '/documents/documento.pdf'
                },
                {
                    filename: 'perrito1.png',
                    path: __dirname + '/images/perrito1.png',
                    cid: 'perrito1' //CID : Content-ID
                }
            ]
        });
        res.send({status:"success", result: "Email sent"});
    }catch(error){
        console.log(`Error al enviar el mail. ${error}`);
    }
})

app.listen(PORT, ()=> {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})