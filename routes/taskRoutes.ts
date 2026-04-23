import express from 'express';

import Task from '../models/Task.js';
import whichError from '../utils/errorHandler.js';

const router = express.Router();

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

    res.status(200).json(updatedTask);
  } catch (error) {
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
