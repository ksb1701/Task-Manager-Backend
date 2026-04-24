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

// 1. Define the strict connection logic
const connectDB = async () => {
  // If we already have a ready connection, skip connecting again
  if (mongoose.connection.readyState === 1) {
    return;
  }
  // Otherwise, halt execution and wait for the connection to establish
  await mongoose.connect(`${process.env.MONGO_URI}task-manager`);
};

// 2. Force Express to execute this before any route
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next(); // Move on to the requested route
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

app.use('/api/tasks', taskRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);

app.get('/health', (req, res) => {
  res.json({ message: "something" });
});

// app.listen(4000, () => {
//   console.log("Server is running!");
// });

export default app;
