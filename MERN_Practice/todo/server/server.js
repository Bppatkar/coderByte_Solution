import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import connectDB from './config/db.js';
import todoRouter from './routes/todo.routes.js';
import userRouter from './routes/user.routes.js';

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/v1', todoRouter);
app.use('/api/v1/users', userRouter); //- /api/v1/users/auth/me

app.get('/', (req, res) => {
  res.send('Server is working');
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
