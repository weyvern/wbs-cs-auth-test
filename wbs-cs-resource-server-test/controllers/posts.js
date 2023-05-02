import Post from '../models/Post.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getAllPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find();
  res.json(posts);
});

export const getSinglePost = asyncHandler(async (req, res, next) => {
  const {
    params: { id }
  } = req;
  const post = await Post.findById(id);
  if (!post) throw new ErrorResponse(`Post with id of ${id} doesn't exist`, 404);
  res.send(post);
});
