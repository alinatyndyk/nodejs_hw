const {Router} = require('express');

const userController = require('../controllers/user.controller');
const userMldwr = require('../middlewares/user.middlewares');

const userRouter = Router();

userRouter.get('/', userController.getAllUsers)
userRouter.post('/',
    userMldwr.checkValidUserBody,
    userMldwr.checkUniqueUserEmail,
    userController.createUser)

userRouter.get('/:userId', userMldwr.checkValidUserId, userController.getUserById)
userRouter.delete('/:userId', userMldwr.checkValidUserId, userController.deleteUserById)
userRouter.put('/:userId', userMldwr.checkValidUserBody, userController.updateUserById)

module.exports = userRouter;