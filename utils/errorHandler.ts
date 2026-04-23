import express, { type Response } from 'express';

export default function whichError(error: Error, res: Response) {
  // Check if it's a Mongoose validation error (Bad Data)
  if (error.name === 'ValidationError')
    return res.status(400).json({ message: 'Invalid data provided:', error: error.message });

  // Check if it's a badly formatted ID in the URL
  if (error.name === 'CastError')
    return res.status(400).json({ message: 'Invalid ID format:', error: error.message });

  // If it's not bad data, it's a real server crash
  return res.status(500).json({ message: 'Server failed to process task:', error: error.message });
}
