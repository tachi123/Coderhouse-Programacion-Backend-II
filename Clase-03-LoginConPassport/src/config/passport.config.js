import passport from 'passport';
import local from 'passport-local';
import userService from '../models/User.js';

const LocalStrategy = local.Strategy;

const initializePassport = () => {

    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email'}, //passReqToCallback permiete que se pueda acceder al objeto req como cualquier otro middleware
        async (req, email, password, done) => {
            const { first_name, last_name, email, age, password} = req.body;
            try{
                let user = await userService.findOne({email: email});
                if(user){
                    //Encontrar un usuario no significa que sea un error, pero no podemos registrarlo
                    //Si queremos marcar que no ocurre error al buscar el usuario, pero ya existe y no te puedo dejar continuar
                    console.log('User already exists');
                    return done(null,false);
                }
                let newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password)
                }
                const userCreated = await userService.create(newUser);
                return done(null, userCreated); //Registración exitosa, retorno el usuario en el callback done
            }catch (error){
                return done(error);
            }
        }
    ))
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.desserializeUser( async(id, done) => {
        let user = await userService.findById(id);
        done(null, user.id);
    }); 
    passport.use('login', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email'}, //passReqToCallback permiete que se pueda acceder al objeto req como cualquier otro middleware
        async (req, email, password, done) => {
            try{
                const user = await userService.findOne({email});
                if(!user){
                    console.log('Usuario no encontrado');
                    return done(null, false, { message: "Usuario no encontrado"});
                }
        
                if(!isValidPassword(user,password)){
                    return done(null, false, { message: "Contraseña incorrecta"});
                }
                return done(null, user); //Autenticación exitosa, retorno el usuario en el callback done
            }catch (error){
                return done(error);
            }
        }
    ))

};

export default initializePassport;