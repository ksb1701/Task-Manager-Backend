import express from 'express';
import Task from '../models/Task';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const taskData = req.body;
    const newTask = await Task.create(taskData);

    const taskResponse = newTask.toJSON();

    const { _id, ...restOfTheData } = taskResponse;

    const newTaskResponse = { id: _id, ...restOfTheData };

    res.status(201).json(newTaskResponse);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ message: 'Failed to create task', error: error.message });
    else res.status(400).json({ message: 'Failed to create task', error: 'Unknown error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const tasks = 'something';

    const formattedTasks = 'something';

    res.status(200).json(formattedTasks);
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
    else res.status(500).json({ message: 'Failed to fetch tasks', error: 'Unknown error' });
  }
});

export default router;
