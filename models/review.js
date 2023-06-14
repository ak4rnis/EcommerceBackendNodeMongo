const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ReviewSchema = new Schema({
    producto: {type: Schema.Types.ObjectId, ref: 'producto', required: true},
    cliente: {type: Schema.Types.ObjectId, ref: 'cliente', required: true},
    venta: {type: Schema.Types.ObjectId, ref: 'venta', required: true},
    review: {type: String, required: true},
    estrellas: {type: Number, required: true}, 
    createdAt: {type: Date, default: Date.now, required: true},
});
module.exports = mongoose.model('review', ReviewSchema);