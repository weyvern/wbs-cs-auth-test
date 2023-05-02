import { Router } from 'express';
import { me, refreshToken, signIn, signUp } from '../controllers/users.js';
import verifyAccessToken from '../middlewares/verifyAccessToken.js';
import verifyRefreshToken from '../middlewares/verifyRefreshToken.js';

const authRouter = Router();

authRouter.post('/signup', signUp);
authRouter.post('/signin', signIn);
authRouter.post('/refresh-token', verifyRefreshToken, refreshToken);
authRouter.get('/me', verifyAccessToken, me);

export default authRouter;
