import express from 'express'
const router = express.Router()
import ProductController from '../controllers/ProductController.js'
/**
 * @swagger
 * tags:
 *   name: Viagens
 *   description: Endpoints relacionados às viagens
 */


/**
 * @swagger
 * /viagens:
 *   get:
 *     summary: Lista todos as viagens
 *     tags: [Viagens]
 *     responses:
 *       200:
 *         description: Lista de viagens
 */
router.route('/viagens')
    .get(ProductController.getAll)


/**
 * @swagger
 * /viagem:
 *   post:
 *     summary: cria uma nova viagem
 *     tags: [Viagens]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - origem
 *               - destino
 *               - preco
 *             properties:
 *               origem:
 *                 type: string
 *                 example: "São Paulo"
 *               destino:
 *                 type: string
 *                 example: "Curitiba"
 *               preco:
 *                 type: number
 *                 example: 150.50
 *               desconto:
 *                 type: number
 *                 example: 10
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 readOnly: true
 *               updatedAt:
 *                 type: string
 *                 format: date-time
 *                 readOnly: true
 *     responses:
 *       201:
 *         description: Cria uma viagens
 */
router.route('/viagem')
    .post(ProductController.create)


/**
 * @swagger
 * /viagem/{id}:
 *   get:
 *     summary: Lista uma viagem específica
 *     tags: [Viagens]
 *     responses:
 *       200:
 *         description: Lista viagem por id
 */
router.route('/viagem/:id')
    .get(ProductController.getById);


export default router