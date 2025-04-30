import mongoose from 'mongoose';

//Definimos el esquema
const jugueteSchema = new mongoose.Schema({


});

const JugueteModel = mongoose.model('Juguete', jugueteSchema);

export default JugueteModel;