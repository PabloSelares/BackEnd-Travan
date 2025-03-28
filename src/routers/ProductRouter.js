import express from 'express'
const router = express.Router()
import ProductController from '../controllers/ProductController.js'

router.route('/product/:id')
.get(() => ProductController.getById(req, res))
router.route('/product')
.get(() => ProductController.getAll(req, res))
export default router