import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const signUp = asyncHandler(async (req, res) => {
  const {
    body: { email, password, ...rest }
  } = req;
  const found = await User.findOne({ email });
  if (found) throw new ErrorResponse('User already exists', 403);
  const hash = await bcrypt.hash(password, 5);
  const { _id } = await User.create({ ...rest, email, password: hash });
  const accessToken = jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 300 });
  const refreshToken = jwt.sign({ _id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: 604800 });

  return res
    .cookie('refreshToken', refreshToken, {
      maxAge: 604800,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false
    })
    .json({
      accessToken
    });
});

export const signIn = asyncHandler(async (req, res) => {
  const {
    body: { email, password }
  } = req;
  const found = await User.findOne({ email }).select('+password');
  if (!found) throw new ErrorResponse(`User doesn't exists`, 404);
  const match = await bcrypt.compare(password, found.password);
  if (!match) throw new ErrorResponse(`Incorrect password`, 401);
  const accessToken = jwt.sign({ _id: found._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 300 });
  const refreshToken = jwt.sign({ _id: found._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: 604800 });

  return res
    .cookie('refreshToken', refreshToken, {
      maxAge: 604800,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false
    })
    .json({
      accessToken
    });
});

export const refreshToken = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const { _id } = await User.findById(userId);
  const accessToken = jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 300 });
  const refreshToken = jwt.sign({ _id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: 604800 });

  return res
    .cookie('refreshToken', refreshToken, {
      maxAge: 604800,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false
    })
    .json({
      accessToken
    });
});

export const me = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const user = await User.findById(userId);
  res.status(201).json(user);
});
