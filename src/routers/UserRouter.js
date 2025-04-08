import express from 'express';
import userController from '../controllers/UserController.js';

const router = express.Router();

router.route('/user').post(userController.create);  
router.route('/user/prompt')
.post((req, res) => userController.talkwithGemini (req, res)); // Corrigido: `talkWithGemini` para `talkwithGemini` (parâmetro)

router.route('/user/longcontext')
.post((req, res) => userController.longContext (req, res)); // Corrigido: `talkWithGemini` para `talkwithGemini` (parâmetro)

router.route('/user/:id')
  .get(userController.getById)    
  .put(userController.update)     
  .delete(userController.delete); 

export default router;