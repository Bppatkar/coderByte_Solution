import express from 'express';
import {
  addTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
} from '../controllers/todo.controller.js';
import auth from '../middleware/auth.js';
import { uploadFile } from '../middleware/multer.js';

const router = express.Router();

// Handle both with and without trailing slash
router.route(['/', '']).get(auth, getAllTodos);
router.route('/add').post(auth, uploadFile, addTodo);
router.route('/:id').get(auth, getTodoById);
router.route('/update/:id').patch(auth, updateTodo);
router.route('/delete/:id').delete(auth, deleteTodo);

export default router;
