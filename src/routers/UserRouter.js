import express from 'express';
import userController from '../controllers/UserController.js';

const router = express.Router();

router.route('/user').post(userController.create);  
router.route('/prompt')
.post(userController.talkwithGemini);

router.route('/user/:id')
  .get(userController.getById)    
  .put(userController.update)     
  .delete(userController.delete); 

export default router;