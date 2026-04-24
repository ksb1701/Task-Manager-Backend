import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import projectRoutes from './routes/projectRoutes.js'
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/tasks', taskRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);

app.get('/health', (req, res) => {
  res.json({ message: "something" });
});

mongoose.connect(`${process.env.MONGO_URI}task-manager`)
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.log('Database connection failed:', err));

// app.listen(4000, () => {
//   console.log("Server is running!");
// });

export default app;
