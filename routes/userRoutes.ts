import express from 'express';

import User from "../models/User.js";
import whichError from '../utils/errorHandler.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await User.create(userData);

    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof Error)
      whichError(error, res);
    else
      return res.status(500).json({ message: 'An unknown error occurred' });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json(users);
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
    const updatedUser = await User.findByIdAndUpdate(_id, req.body, { returnDocument: 'after' });

    res.status(200).json(updatedUser);
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
    const deletedUser = await User.findByIdAndDelete(_id);

    res.status(200).json(deletedUser);
  } catch (error) {
    if (error instanceof Error)
      whichError(error, res);
    else
      return res.status(500).json({ message: 'An unknown error occurred' });
  }
});

export default router;
