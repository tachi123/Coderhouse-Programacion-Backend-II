import config from "../config/config.js";
import twilio from 'twilio';

const client = twilio(config.twilioAccountSID, config.twilioAuthToken); // (TWILIO_ACCOUNT_SID , TWILIO_AUTH_TOKEN)

export const enviarSMS = async (req, res) => {
    try{
        const {nombre, producto} = req.body; //Obtener los body params
        if(!nombre || ! producto) 
            res.status(400).send({status: "error", message: "Se requieren los parámetros nombre y/o producto"})
        let result = await client.messages.create({
            body: `Gracias, ${nombre}, tu solicitud del producto ${producto} ha sido aprobada`,
            from: config.twilioSMSNumber,
            to: config.twilioSMSNumberVerified
        })
        res.send({status: "success", result: "Message sent"})
    }catch(error){
        console.error("Error al enviar SMS", error);
        res.status(500).send({status: "error", message: "Error al enviar SMS", error})
    }
}