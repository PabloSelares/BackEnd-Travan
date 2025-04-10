import Compra from '../models/CompraModel.js';

const compraController = {
    create: async (req, res) => {
        try {
            const compra = req.body;
            const newCompra = await Compra.create(compra);
            res.status(201).json({ message: 'Compra realizada com sucesso', newCompra });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const compras = await Compra.find().populate("produto");
            res.status(200).json(compras);
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