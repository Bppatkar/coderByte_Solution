import express from 'express';
import {
  loginController,
  registerController,
  getMeController,
} from '../controllers/user.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.route('/register').post(registerController);
router.route('/login').post(loginController);
router.route('/auth/me').get(auth, getMeController);

export default router;
