import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    createdAt: { type: Date, default: Date.now }
})


export default mongoose.model('Compra', Schema)