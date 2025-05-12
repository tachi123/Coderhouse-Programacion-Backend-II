import dotenv from "dotenv";

dotenv.config(); //Nos permitirá trabajar con las variables de entorno del archivo ".env"

export default {
    PORT : process.env.PORT,
    twilioAccountSID : process.env.TWILIO_ACCOUNT_SID,
    twilioAuthToken :process.env.TWILIO_ACCOUNT_TOKEN,
    twilioSMSNumber : process.env.TWILIO_SMS_NUMBER,
    twilioSMSNumberVerified : process.env.TWILIO_SMS_NUMBER_VERIFIED
}