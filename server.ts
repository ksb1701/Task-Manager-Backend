import 'dotenv/config';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

// Config Imports
import { corsOptions } from './config/cors.js';
import { dbMiddleware } from './config/db.js';
// Route Imports
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(express.json()); 
app.use(cookieParser());
app.use(dbMiddleware);

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: "ok", 
    dbState: mongoose.connection.readyState === 1 ? "connected" : "disconnected" 
  });
});

// Server Initialization
if (process.env.NODE_ENV !== 'production') {
  app.listen(4000, () => {
    console.log("Local development server is running on port 4000!");
  });
}

export default app;
