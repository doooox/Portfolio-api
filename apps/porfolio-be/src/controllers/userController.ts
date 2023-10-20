import { Types } from 'mongoose';
import jwt = require('jsonwebtoken');
import { Request, Response } from 'express';
import User from '../models/UserModel';
import { compare, genSalt, hash } from 'bcrypt';
import { responseMessage } from '../utils/helpers';

const generateToken = (id: Types.ObjectId, email: string) => {
  return jwt.sign({ id, email }, process.env.NX_JWT_SECRET, {
    expiresIn: '1d',
  });
};

export const RegisterUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);

  const user = await User.create({
    email,
    password: hashedPassword,
  });

  if (!user) return responseMessage(400, res, 'Invalid User Data');

  return res.status(201).json({
    email: user.email,
    token: generateToken(user.id, user.email),
  });
};

export const LoginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return responseMessage(400, res, 'Invalid email or password!');

  const matchPassword = await compare(password, user.password);
  if (!matchPassword)
    return responseMessage(400, res, 'Invalid email or password!');

  return res.status(201).json({
    email: user.email,
    token: generateToken(user.id, user.email),
  });
};

export const LogoutUser = async (req: Request, res: Response) => {
  const userId = req.user.id;
  try {
    const user = await User.findByIdAndUpdate(userId, { token: null });
    if (!user) throw new Error('User not found');
    responseMessage(200, res, 'Logout successful');
  } catch (error) {
    responseMessage(500, res, 'Server Error');
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const projects = await User.find().sort([['createdAt', 'descending']]);

  if (!projects) return res.status(400).json({ message: 'No project found' });

  return res.status(200).json(projects);
};
