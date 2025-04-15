import mongoose from 'mongoose';
import { createHash } from '../utils.js';

//Definimos el esquema usuario
const userSchema = mongoose.Schema({
    first_name: {type: String, required: true},// Nombre del usuario
    last_name: {type: String, required: true},//Apellido del usuario
    email: {type: String, required: true, unique: true},//Correo electrónico del usuario (ÚNICO)
    role: {type: String, required: true, default: 'user'},//Rol del usuario (por defecto, 'user)
    password: {type: String, required: true}//Contraseña del usuario (encriptada)
})

//Middleware para hashear la contraseña antes de guardar el usuario
//SOLO HASHEAMOS LA CONTRASEÑA CUANDO VIENE LA CONTRASEÑA EN TEXTO PLANO
//Eso sucede en dos escenarios: cuando se registra un usuario por primera vez,
//y cuando un usuario cambia la contraseña
userSchema.pre('save', function(next){
    if(!this.isModified('password')) return next(); //Si la contraseña no fue modificada, no voy a querer que se hashee y pise nuevamente
    this.password = createHash(this.password); //Reemplazo la contraseña en texto plano por el hash
    next(); //Para que continue al siguiente middleware o al task principal
})

const userModel = mongoose.model('user', userSchema);

export default userModel;