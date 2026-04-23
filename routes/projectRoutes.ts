import express from 'express';

import Project from "../models/Project.js";
import whichError from '../utils/errorHandler.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const projectData = req.body;
    const newProject = await Project.create(projectData);

    res.status(201).json(newProject);
  } catch (error) {
    if (error instanceof Error)
      whichError(error, res);
    else
      return res.status(500).json({ message: 'An unknown error occurred' });
  }
});

router.get('/', async (req, res) => {
  try {
    const projects = Project.find({});

    res.status(200).json(projects);
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
    const updatedProject = await Project.findByIdAndUpdate(_id, req.body, { returnDocument: 'after' });

    res.status(200).json(updatedProject);
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
    const deletedProject = await Project.findByIdAndDelete(_id);

    res.status(200).json(deletedProject);
  } catch (error) {
    if (error instanceof Error)
      whichError(error, res);
    else
      return res.status(500).json({ message: 'An unknown error occurred' });
  }
});

export default router;
