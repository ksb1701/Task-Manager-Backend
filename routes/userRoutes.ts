import express from 'express';

import { 
  deleteUser, 
  getAllUsers, 
  getMe, 
  loginUser, 
  logoutUser, 
  registerUser, 
  updateUser} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public auth routes
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/', registerUser); 

// Protected user routes
router.get('/me', protect, getMe);

// Protected admin/management routes (add admin middleware here later!)
router.get('/', protect, getAllUsers);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);

export default router;
