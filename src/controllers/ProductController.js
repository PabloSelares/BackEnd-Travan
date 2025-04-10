import Product  from '../models/ProductModel.js'
const productController = {
    create: async (req, res) => {
        try {
            const product = req.body
            const newProduct = await Product.create(product)
            res.status(201).json({ message: 'Product created successfully', newProduct })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    getAll: async (req, res) => {
        try {
            const products = await Product.find()
            res.status(200).json(products)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    getById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id)
            if (!product) {
                return res.status(404).json({ message: 'Essa viagem existe ou tu ta viajando?' })
            }
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}
export default productController