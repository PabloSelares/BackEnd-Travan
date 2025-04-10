import Compra from '../models/CompraModel.js';
import Product from '../models/ProductModel.js';

const compraController = {
    create: async (req, res) => {
        try {
            const id = req.body.produto;
            if (!id) throw new Error('ID do produto não fornecido');
            let produto = await Product.find({ _id: id });
            if (!produto) throw new Error('Produto não encontrado');
            let compra = {
                produto: id
            };
            compra = await Compra.create(compra);
            res.status(201).json({ message: 'Compra realizada com sucesso', compra });
        } catch (error) {
            if (error.message.includes('Cast to ObjectId failed for value')) {
                return res.status(400).json({ message: 'ID do produto inválido' });
            }
            res.status(500).json({ message: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const compras = await Compra.find().populate("produto").lean();
    
            const comprasFiltradas = compras.map(compra => {
                const { __v, ...compraSemV } = compra;
                const { createdAt, updatedAt, __v: __vProduto, ...produtoFiltrado } = compra.produto || {};
    
                return {
                    ...compraSemV,
                    produto: produtoFiltrado
                };
            });
    
            res.status(200).json(comprasFiltradas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getById: async (req, res) => {
        try {
            const compra = await Compra.findById(req.params.id);
            if (!compra) {
                return res.status(404).json({ message: 'Essa compra existe ou tu ta viajando?' });
            }
            res.status(200).json(compra);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
export default compraController;