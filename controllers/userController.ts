import bcrypt from 'bcrypt';
import { type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import whichError from '../utils/errorHandler.js';

export const registerUser = async (req: Request, res: Response) => {
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
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});

    res.status(200).json(users);
  } catch (error) {
    if (error instanceof Error)
      whichError(error, res);
    else
      return res.status(500).json({ message: 'An unknown error occurred' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    const safeUser = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      department: user.department,
      position: user.position
    };

    res.cookie('taskflow_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({ user: safeUser });
  } catch (error) {
    if (error instanceof Error)
      whichError(error, res);
    else
      return res.status(500).json({ message: 'An unknown error occurred' });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user!.userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const safeUser = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      department: user.department,
      position: user.position
    };

    res.status(200).json(safeUser);
  } catch (error) {
    if (error instanceof Error)
      whichError(error, res);
    else
      return res.status(500).json({ message: 'An unknown error occurred' });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie('taskflow_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
  });

  res.status(200).json({ message: 'Logged out successfully' });
};

export const updateUser = async (req: Request, res: Response) => {
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
};

export const deleteUser = async (req: Request, res: Response) => {
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
};
