import dotenv from "dotenv";

dotenv.config();

export default {
    PERSISTENCE: process.env.PERSISTENCE,
    URL_MONGO: process.env.URL_MONGO
}