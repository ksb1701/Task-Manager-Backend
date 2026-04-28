import mongoose from 'mongoose';

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    if (process.env.NODE_ENV !== 'production') {
      console.log("MongoDB: Reusing existing connection.");
    }
    return;
  }

  try {
    await mongoose.connect(`${process.env.MONGO_URI}task-manager`);
    console.log("MongoDB: Connected successfully!"); 
  } catch (error) {
    console.error("MongoDB: Connection failed to establish!", error);
    throw error;
  }
};

// You can export the middleware itself too
export const dbMiddleware = async (req: any, res: any, next: any) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database middleware blocked request:", error);
    res.status(500).json({ error: 'Database connection failed' });
  }
};
