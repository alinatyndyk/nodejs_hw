const {Router} = require('express');

const {authController} = require('../controllers');
const {userMldwr} = require('../middlewares');

const authRouter = Router();

authRouter.post('/login', userMldwr.getUserDynamically('body', 'email', 'email') ,authController.Login);

module.exports = authRouter;