const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VentaSchema = new Schema({
    cliente: {type: Schema.Types.ObjectId, ref: 'cliente', required: true},
    nventa: {type: String, required: true},
    subtotal: {type: Number, required: true},
    envio_titulo: {type: String, required: true},
    envio_precio: {type: Number, required: true},
    transaccion: {type: String, required: true},
    cupon: {type: String, required: true},
    estado: {type: String, required: true},
    direccion: {type: Schema.Types.ObjectId, ref: 'direccion', required: true},
    nota: {type: String, required: true},
    createdAt: {type: Date, default: Date.now, required: true}
});

module.exports = mongoose.model('venta', VentaSchema);