const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductoSchema = new Schema({
    titulo: {type: String, required: true},
    slug: {type: String, required: true},
    galeria: [{type: Object, required: false}],
    portada: {type: String, required: false},
    precio: {type: Number, required: true},
    descripcion: {type: String, required: true},
    contenido: {type: String, required: true},
    stock: {type: Number, required: true},
    nventas: {type: Number, default: 0, required: true},
    npuntos: {type: Number, default: 0, required: true},
    categoria: {type: String, required: true},
    estado: {type: String, default: 'Edicion', required: false},
    createdAt: {type: Date, default: Date.now, required: true},
});

module.exports = mongoose.model('producto', ProductoSchema);