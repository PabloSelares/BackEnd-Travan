import express from 'express'
const router = express.Router()
import ProductController from '../controllers/ProductController.js'

router.route('/viagem/:id')
.get(ProductController.getById);
router.route('/viagem')
.get(ProductController.getAll)
router.route('/viagem')
.post(ProductController.create)
export default router