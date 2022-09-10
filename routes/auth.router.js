const {Router} = require('express');

const {authController} = require('../controllers');
const {userMldwr, authMldwr, commonMldwr} = require('../middlewares');
const {loginUserValidator} = require("../validators/user.validators");

const authRouter = Router();

authRouter.post('/login',
    commonMldwr.checkValidBody(loginUserValidator),
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