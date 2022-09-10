const {Router} = require('express');

const userController = require('../controllers/user.controller');
const {userMldwr, commonMldwr, authMldwr} = require('../middlewares');
const {newUserValidator, updateUserValidator} = require("../validators/user.validators");

const userRouter = Router();

userRouter.get('/', userController.getAllUsers)
userRouter.post('/',
    commonMldwr.checkValidBody(newUserValidator),
    userMldwr.checkUniqueUserEmail,
    userController.createUser)

userRouter.get('/:userId',
    commonMldwr.checkValidId('userId'),
    userMldwr.isUserPresent(),
    userController.getUserById)
userRouter.delete('/:userId',
    commonMldwr.checkValidId('userId'),
    authMldwr.checkIsAccessTokenValid,
    userMldwr.isUserPresent(),
    userController.deleteUserById)
userRouter.put('/:userId',
    commonMldwr.checkValidId('userId'),
    commonMldwr.checkValidBody(updateUserValidator),
    authMldwr.checkIsAccessTokenValid,
    userMldwr.isUserPresent(),
    userMldwr.checkUniqueUserEmail,
    userController.updateUserById)

module.exports = userRouter;