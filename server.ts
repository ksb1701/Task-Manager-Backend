import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoute.js';
import mongoose from 'mongoose';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/tasks', taskRoutes);

app.get('/health', (req, res) => {
  res.json({ message: "something" });
});

mongoose.connect('mongodb://127.0.0.1:27017/task-manager')
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.log('Database connection failed:', err));

app.listen(4000, () => {
  console.log("Server is running!");
});
