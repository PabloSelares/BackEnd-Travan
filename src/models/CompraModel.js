import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    comprador: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String },
    createdAt: { type: Date, default: Date.now }
})


export default mongoose.model('Compra', Schema)