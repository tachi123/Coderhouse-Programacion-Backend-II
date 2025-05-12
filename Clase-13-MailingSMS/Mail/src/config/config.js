import dotenv from "dotenv";

dotenv.config(); //Nos permitirá trabajar con las variables de entorno del archivo ".env"

export default {
    PORT : process.env.APP_PORT,
    mailService : process.env.MAIL_SERVICE,
    mailPort :process.env.MAIL_PORT,
    mailFrom : process.env.MAIL_FROM,
    mailTo: process.env.MAIL_TO,
    mailPass : process.env.MAIL_PASS,
    mailHost : process.env.MAIL_HOST
}