import express from 'express';
import userController from '../controllers/UserController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Endpoints relacionados a usuários
 */

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               role:
 *                 type: string
 *                 example: CLIENT
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Realiza login do usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login bem-sucedido com token JWT
 *       401:
 *         description: Credenciais inválidas
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Busca usuário por ID
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       500:
 *         description: Erro ao buscar usuário
 *
 *   put:
 *     summary: Atualiza um usuário por ID
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Maria Souza
 *               email:
 *                 type: string
 *                 example: maria@email.com
 *               role:
 *                 type: string
 *                 example: ADMIN
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *
 *   delete:
 *     summary: Remove um usuário por ID
 *     tags: [Usuários]
*     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 */

/**
 * @swagger
 * /user/prompt:
 *   post:
 *     summary: Interage com IA (Prompt direto)
 *     tags: [Usuários]
  *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - prompt
 *             properties:
 *               prompt:
 *                 type: string
 *                 example: Me diga uma curiosidade sobre Marte.
 *     responses:
 *       200:
 *         description: Resposta da IA
 */

/**
 * @swagger
 * /user/longcontext:
 *   post:
 *     summary: Interage com IA com contexto longo (PDF)
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - prompt
 *             properties:
 *               prompt:
 *                 type: string
 *                 example: Qual é a missão da empresa citada no PDF?
 *     responses:
 *       200:
 *         description: Resposta baseada no contexto
 */
/**
 * @swagger
 * /user/findByEmail/{email}:
 *   get:
 *     summary: Busca usuário por Email
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       500:
 *         description: Erro ao buscar usuário
 *
 */
router.route('/user').post(userController.create);
router.route('/user/login').post(userController.login);
router.route('/user/prompt')
  .post((req, res) => userController.talkwithGemini(req, res)); 

router.route('/user/longcontext')
  .post((req, res) => userController.longContext(req, res)); 

router.route('/user/:id')
  .get(userController.getById)
  .put(userController.update)
  .delete(userController.delete);
router.route('/user/findByemail/:email')
  .get(userController.getByEmail);
export default router;