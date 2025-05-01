import express from 'express';
import cors from 'cors';

const app = express();

const whiteList = ['http://127.0.0.1:5500'];

const corsOptions = {
    //origin: 'http://127.0.0.1:5500',
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) { //Si esta en la lista blanca o no tiene origin
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions)); //Middleware CORS vacío por defecto habilito CUALQUIER ORIGEN

app.use(express.json());

app.get('/test', (req, res) => {
    res.send({message: "Respuesta"})
})

app.listen(3000, () => console.log("Listening"));