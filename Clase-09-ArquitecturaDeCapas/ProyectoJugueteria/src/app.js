import express from 'express';

import jugueteRouter from './routes/juguete.router.js';
import userRouter from './routes/user.router.js';

const app = express();
const PORT = 3000;

app.use(express.json()); //Middlewarea para parsear JSON

app.use('/api/juguete', jugueteRouter);
app.use('/api/user', userRouter);

app.listen(PORT , `Servidor escuchando en el puerto ${PORT}`);