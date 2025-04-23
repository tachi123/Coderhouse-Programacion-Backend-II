import express from 'express';

import dictionaryRouter from './routes/dictionary.router.js';
import petRouter from './routes/pet.router.js';
import UserRouter from './routes/user.router.js';
import SessionRouter from './routes/session.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/dictionary', dictionaryRouter);
app.use('/api/pet', petRouter);

//CUSTOM ROUTER
//Al utilizar custom router, tenemos que inicializarlos. Crear instancias de los router
const userRouter = new UserRouter();
app.use('/api/user', userRouter.getRouter());
app.use('/api/session', (new SessionRouter()).getRouter());

app.listen(3000, () => console.log("Servidor escuchando en el puerto 3000"));