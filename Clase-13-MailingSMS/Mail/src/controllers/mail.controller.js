import config from '../config/config.js';
import __dirname from '../utils.js';
import { transport } from '../config/mail.config.js';

export const enviarCorreo = async (req, res) => {
    try{
        const { destinatario, asunto, mensaje } = req.body;
        let result = await transport.sendMail({
            from: config.mailFrom,
            to: destinatario || config.mailTo,
            subject: asunto  || "Correo de prueba",
            html: `
                <div>
                    <h1>${mensaje || '¡Esto es un test!'}</h1>
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
}