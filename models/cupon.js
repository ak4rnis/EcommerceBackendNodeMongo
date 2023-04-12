const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CuponSchema = new Schema({
    codigo: {type: String, required: true},
    tipo: {type: String, required: true},
    valor: {type: Number, required: true},
    limite: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now, required: true}
});

module.exports = mongoose.model('cupon',CuponSchema);