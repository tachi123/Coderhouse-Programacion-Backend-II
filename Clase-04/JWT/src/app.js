import express from 'express';

import viewsRouter from './routes/views.router.js';
import sessionRouter from './routes/session.router.js';

const app = express();

//Configuramos para trabajar con JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/',viewsRouter);
app.use('/session',sessionRouter);

app.listen(8080, () => console.log('Listening on port 8080'));