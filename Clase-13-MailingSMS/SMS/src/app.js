import express from 'express';
import config from './config/config.js';
import smsRouter from './routes/sms.router.js';

const app = express();

app.use('/api/sms', smsRouter);

app.listen(config.PORT, () => console.log(`Listening on PORT: ${config.PORT}`));