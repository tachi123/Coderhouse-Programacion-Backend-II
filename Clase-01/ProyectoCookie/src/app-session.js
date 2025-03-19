import express from 'express';
import session from 'express-session';

const app = express();

app.use(session({
    secret: 'secretCoder',
    /**
     * Resave permite mantener la sesión activa en caso de que la sesión se mantenga inactiva.
     * Si se deja en false, la sesión morirá en caso de que exista cierto tiempo de inactividad
     */
    resave: true,
    /**
     * saveUninitialized permite guardar cualquier sesión aun cuando el objeto de sesión no tenga nada para contener.
     * Si se deja en false, no se guardará el objeto de sesión si esta vacío
     */
    saveUninitialized: true
    }
));

//URL DE TEST: http://localhost:8080/login?username=pepe&password=pepepass
app.get('/login', (req, res) => {
    const {username, password} = req.query;
    if(username === 'pepe' && password === 'pepepass'){
        //De alguna manero, valido usuario y contraseña y busco en la base de datos los roles
        req.session.user = username;
        req.session.admin = false;
        res.send('Login success!')
    }else{
        res.send('login failed!');
    }
})

function auth(req,res, next){
    if(req.session?.user){
        if(req.session?.admin){
            return next()
        }else{
            return res.status(401).send('Error no es administrador')
        }
    }
    return res.status(401).send('Error de autorización')
}

app.get('/privado', auth, (req,res) => {
    res.send('¡Si estas viendo esto es porque ya te logueaste y además sos administrador!')
})

app.get('/session', (req, res) =>{
    if(req.session.counter){//Si al conectar la sesión ya existe, aumento el contador
        req.session.counter++;
        res.send(`Se ha visitado el sitio ${req.session.counter} veces.`)
    }else{//Si entro por acá, es que el contador no existía y lo inicializo en 1
        req.session.counter=1;
        res.send('¡Bienvenido!')
    }
})

app.get('/logout', (req,res)=>{
    req.session.destroy( 
        error => {
            if (!error) res.send('Logout OK!')
                else res.send({status: "Logout ERROR", body: err})
        }
    )
})

app.listen(8080, ()=> {
    console.log("Listening on port 8080")
})


