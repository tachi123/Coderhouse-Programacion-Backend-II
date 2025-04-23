import express from 'express';
import config from './config/config.js';

const PORT = config.port;

const app = express();

console.log(config);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
