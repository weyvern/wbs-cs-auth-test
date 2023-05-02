import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const verifyAccessToken = asyncHandler(async (req, res, next) => {
  const {
    headers: { authorization }
  } = req;
  if (!authorization) throw new ErrorResponse('Please login', 401);
  jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
    if (err) {
      next(new ErrorResponse('Access token is invalid', 401));
    }
    req.userId = decode._id;
    next();
  });
});

export default verifyAccessToken;
