import express from 'express';
import config from './config/config.js';
import userRouter from './routes/user.router.js';
import orderRouter from './routes/order.router.js';
import businessRouter from './routes/business.router.js';
import connectDB from './config/db.config.js';
import cors from 'cors';

const app = express();
const connection = connectDB(config.URL_MONGO);

app.use(cors());

//Server config
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Routers
app.use('/api/user', userRouter);
app.use('/api/business', businessRouter);
app.use('/api/order', orderRouter);

//Iniciar el servidor
app.listen(config.PORT, ()=> console.log(`Listening on PORT: ${config.PORT}`))