import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'employee'],
    required: true
  },
  avatar: {
    type: String
  },
  department: {
    type: String
  },
  position: {
    type: String
  },
  hourlyRate: {
    type: Number
  },
  isActive: {
    type: Boolean
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
