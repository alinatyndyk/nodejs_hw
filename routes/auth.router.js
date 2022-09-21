const {Router} = require('express');

const {authController} = require('../controllers');
const {userMldwr, authMldwr, commonMldwr} = require('../middlewares');
const {loginUserValidator, userPasswordValidator, userEmailValidator} = require("../validators/user.validators");
const tokenTypeEnum = require("../constants/tokenType.enum");

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

authRouter.post('/password/forgot',
    commonMldwr.checkValidBody(userEmailValidator),
    userMldwr.getUserDynamically('body', 'email', 'email'),
    authController.ForgotPassword
)

authRouter.put('/password/forgot',
    commonMldwr.checkValidBody(userPasswordValidator),
    authMldwr.checkIsActionTokenValid(tokenTypeEnum.FORGOT_PASSWORD),
    authMldwr.checkPreviousPassword,
    authController.SetNewPassword
)

module.exports = authRouter;