import { Router } from 'express';
import { getAllPosts, getSinglePost } from '../controllers/posts.js';
import verifyAccessToken from '../middlewares/verifyAccessToken.js';

const postsRouter = Router();

postsRouter.route('/').get(verifyAccessToken, getAllPosts);

postsRouter.route('/:id').get(verifyAccessToken, getSinglePost);

export default postsRouter;
