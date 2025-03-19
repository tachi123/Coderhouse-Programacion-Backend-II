import express from 'express';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import { __dirname } from './utils.js';

const app = express();

/**
 * Conectamos cookie-parser con express
 * para poder gestionar dentro de nuestras peticiones
 * los elementos correspondientes a las cookies
 */
app.use(cookieParser("CoderSecret"));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/setCookie', (req, res) => {
    res.cookie('nombre', 'Nahuel', {maxAge: 10000}); //Setear la cookie 'nombre'
    res.send('Cookie establecida correctamente');
})

app.get('/getCookie', (req, res) => {
    console.log('Cookie: ', req.cookies);
    res.send({"Cookies":req.cookies});
})

app.get('/deleteCookie', (req,res) => {
    res.clearCookie('nombre').send('Cookie "nombre" eliminada correctamente');
})

app.post('/submitCookie', (req, res) => {
    const { nombre , correo } = req.body;
    res.cookie('user', { user: correo }, { maxAge: 10000} );
    res.send('Cookie creada!');
})

//Rutas asociadas a cookies firmadas
app.get('/setSignedCookie', (req, res) => {
    res.cookie('SignedCookie', 'Nahuel', {maxAge: 90000, signed: true})
        .send('Cookie signed asignada correctamente');
})

app.get('/getSignedCookie', (req, res) => {
    const signedCookieValue = req.signedCookies.SignedCookie; //Obtenemos el valor de la cookie firmada
    if(signedCookieValue){//Si no fue modificada entra al if
        res.send('El valor de la cookie firmada es: '+signedCookieValue)
    }else{//La cookie fue modificada
        res.send('¡La cookie no es válida!')
    }
})

//Configuración del motor de plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine','handlebars');

app.get('/', (req,res)=>{
    res.render('index');
})

app.listen(8080, () => console.log("Listening on PORT: 8080"));