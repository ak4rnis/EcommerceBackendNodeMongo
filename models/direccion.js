const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DireccionSchema = Schema({
    cliente: {type: Schema.Types.ObjectId, ref: 'cliente', required: true},
    destinario: {type: String, required: true},
    dni: {type: String, required: true},
    zip: {type: String, required: true},
    direccion: {type: String, required: true},
    pais: {type: String, required: true},
    region: {type: String, required: false},
    provincia: {type: String, required: false},
    distrito: {type: String, required: false},
    telefono: {type: String, required: true},
    principal: {type: Boolean, required: true},
    createdAt: {type: Date, default: Date.now, required: true}
});

module.exports = mongoose.model('direccion',DireccionSchema); 