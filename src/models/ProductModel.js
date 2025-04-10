import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
    origem: { type: String, required: true },
    destino: { type: String, required: true },
    preco: { type: Number, required: true },
    desconto: { type: Number },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
export default mongoose.model('Product', Schema)    