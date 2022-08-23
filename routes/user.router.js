const {Router} = require('express');

const userController = require('../controllers/user.controller');
const {userMldwr, commonMldwr} = require('../middlewares');
// const commonMldwr = require('../middlewares/common.middlewares')

const userRouter = Router();

userRouter.get('/', userController.getAllUsers)
userRouter.post('/',
    userMldwr.checkValidUserBody,
    userMldwr.checkUniqueUserEmail,
    userController.createUser)

userRouter.get('/:userId',
    commonMldwr.checkValidUserId('userId'),
    userMldwr.isUserPresent,
    userController.getUserById)
userRouter.delete('/:userId',
    commonMldwr.checkValidUserId('userId'),
    userMldwr.isUserPresent,
    userController.deleteUserById)
userRouter.put('/:userId',
    commonMldwr.checkValidUserId('userId'),
    userMldwr.isUserPresent,
    userMldwr.checkUniqueUserEmail,
    userMldwr.checkValidUserBody,
    userController.updateUserById)

module.exports = userRouter;