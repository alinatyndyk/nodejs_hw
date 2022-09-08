const {Router} = require('express');

const {authController} = require('../controllers');
const {userMldwr, authMldwr} = require('../middlewares');

const authRouter = Router();

authRouter.post('/login',
    userMldwr.getUserDynamically('body', 'email', 'email'),
    authController.Login);

authRouter.post('/refresh',
    authMldwr.checkIsRefreshTokenValid,
    authController.Refresh
)

authRouter.post('/logout',
    authMldwr.checkIsAccessTokenValid,
    authController.Logout
)

module.exports = authRouter;