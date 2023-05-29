const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CarritoSchema = Schema({
    producto: {type: Schema.Types.ObjectId, ref: 'producto', required: true},
    cliente: {type: Schema.Types.ObjectId, ref: 'cliente', required: true},
    cantidad: {type: Number, required: true},
    variedad: {type: String, required: true},
    createdAt: {type: Date, default: Date.now, required: true}
});

module.exports = mongoose.model('carrito',CarritoSchema);