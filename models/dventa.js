const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DventaSchema = new Schema({
    producto: {type: Schema.Types.ObjectId, ref: 'producto', required: true},
    venta: {type: Schema.Types.ObjectId, ref: 'venta', required: true},
    subtotal: {type: Number, required: true},
    variedad: {type: String, required: true},
    cantidad: {type: String, required: true},
    cliente: {type: Schema.Types.ObjectId, ref: 'cliente', required: true},
    createdAt: {type: Date, default: Date.now, required: true},

});

module.exports = mongoose.model('dventa', DventaSchema);