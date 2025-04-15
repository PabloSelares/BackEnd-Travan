import express from 'express';
import compraController from '../controllers/CompraController.js';
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Compras
 *   description: Endpoints relacionados às compras de produtos
 */

/**
 * @swagger
 * /compra:
 *   get:
 *     summary: Retorna todas as compras
 *     tags: [Compras]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de compras retornada com sucesso
 *       500:
 *         description: Erro ao buscar as compras
 */
router.route('/compra')
    .get(compraController.getAll)

/**
 * @swagger
 * /compra/{id}:
 *   get:
 *     summary: Retorna uma compra por ID
 *     tags: [Compras]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da compra
 *     responses:
 *       200:
 *         description: Compra encontrada
 *       404:
 *         description: Compra não encontrada
 *       500:
 *         description: Erro ao buscar compra
 */
router.route('/compra/:id')
    .get(compraController.getById)
/**
 * @swagger
 * /compra:
 *   post:
 *     summary: Cria uma nova compra
 *     tags: [Compras]
*     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - produto
 *             properties:
 *               produto:
 *                 type: string
 *                 description: ID do produto comprado
 *                 example: 661672b78c1a88d73c3d9e45
 *               comprador:
 *                 type: string
 *                 description: ID do usuario que esta realizando a compra
 *                 example: 66169a78c1h88d73c5r3f45
 *     responses:
 *       201:
 *         description: Compra criada com sucesso
 *       500:
 *         description: Erro ao criar a compra
 */
router.route('/compra')
    .post(compraController.create)



export default router;
