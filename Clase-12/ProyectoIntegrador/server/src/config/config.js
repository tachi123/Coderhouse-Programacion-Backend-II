import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT || 8080,
    URL_MONGO: process.env.URL_MONGO || 'mongodb://localhost:27017/CoderHouse-2'
}