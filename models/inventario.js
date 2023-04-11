const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const InventarioSchema = Schema({
    producto: {type: Schema.Types.ObjectId, ref: 'producto', required: true},
    cantidad: {type: Number, required: true},
    admin: {type: Schema.Types.ObjectId, ref: 'admin', required: true},
    proveedor: {type: String, required: true},
    createdAt: {type: Date, default: Date.now, required: true}
});

module.exports  = mongoose.model('inventario',InventarioSchema)