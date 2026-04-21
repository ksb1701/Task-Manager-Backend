import express, { type Response } from 'express';
import Task from '../models/Task.js';

const router = express.Router();

function whichError(error: Error, res: Response) {
  // Check if it's a Mongoose validation error (Bad Data)
  if (error.name === 'ValidationError')
    return res.status(400).json({ message: 'Invalid data provided:', error: error.message });

  // Check if it's a badly formatted ID in the URL
  if (error.name === 'CastError')
    return res.status(400).json({ message: 'Invalid Task ID format:', error: error.message });

  // If it's not bad data, it's a real server crash
  return res.status(500).json({ message: 'Server failed to process task:', error: error.message });
}

router.post('/', async (req, res) => {
  try {
    const taskData = req.body;
    const newTask = await Task.create(taskData);

    res.status(201).json(newTask);
  } catch (error) {
    if (error instanceof Error)
      whichError(error, res);
    else
      return res.status(500).json({ message: 'An unknown error occurred' });
  }
});

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({});

    res.status(200).json(tasks);
  } catch (error) {
    if (error instanceof Error)
      whichError(error, res);
    else
      return res.status(500).json({ message: 'An unknown error occurred' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    console.log("Incoming PUT data:", req.body);
    const _id = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(_id, req.body, { returnDocument: 'after' });

    res.status(200).json(updatedTask);  // Don't know the number to put here.
  } catch (error) {  // Again, don't know the codes.
    if (error instanceof Error)
      whichError(error, res);
    else
      return res.status(500).json({ message: 'An unknown error occurred' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(_id);

    res.status(200).json(deletedTask);
  } catch (error) {
    if (error instanceof Error)
      whichError(error, res);
    else
      return res.status(500).json({ message: 'An unknown error occurred' });
  }
});

export default router;
