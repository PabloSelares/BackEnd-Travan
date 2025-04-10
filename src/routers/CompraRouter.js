import express from 'express';
import compraController from '../controllers/CompraController';
const router = express.Router();

router.route('/compra/:id')
    .get(compraController.getById)
router.route('/compra')
    .post(compraController.create)
router.route('/compra')
    .get(compraController.getAll)
