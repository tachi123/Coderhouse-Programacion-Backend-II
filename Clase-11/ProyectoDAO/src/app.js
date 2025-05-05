import express from 'express';

import contactsRouter from './routes/contact.router.js';

const app = express();
/** Lo sacamos porque estamos implementando el patron FACTORY (./dao/factory.js) para la creación de los objetos DAO
        import mongoose from 'mongoose';
        const connection = mongoose.connect('');
*/
app.use(express.json());
app.use(express.urlencoded({extended : true}));

const server = app.listen(8080, ()=> console.log("Listening on 8080"));

app.use('/contact', contactsRouter);

