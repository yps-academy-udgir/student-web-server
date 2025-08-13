

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('❌ JWT_SECRET is not defined in the .env file');
}



export const signup = async (req: any, res: any) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  // console.log("jwt_secret", JWT_SECRET);

  try {
    const newUser = await User.create({ name, email, password: hash });
    res.status(201).json({ 
      message: 'User created successfully',
      userId: newUser._id,
      email: newUser.email,
      success: true
     });
  } catch (err:any) {
     if (err.code === 11000 && err.keyPattern?.email) {
      return res.status(400).json({
        errors: {
          email: 'Email already exists'
        },
        success: false
      });
    }

    res.status(500).json({
      message: 'Internal Server Error',
      success: false
    });
  }
};

export const login = async (req: any, res: any) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ 
      message: 'Invalid credentials',
      success: false,

     });
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ 
    token,
    userId: user._id,
    email: user.email,
    message: 'Login successful',
    success: true,
    username: user.name
  });
};
