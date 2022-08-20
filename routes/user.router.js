const {Router} = require('express');

const userController = require('../controllers/user.controller');
const userMldwr = require('../middlewares/user.middlewares');

const userRouter = Router();

userRouter.get('/', userController.getAllUsers)
userRouter.post('/', userMldwr.checkValidUserBody,userController.createUser)

userRouter.get('/:userId', userController.getUserById)
userRouter.delete('/:userId', userController.deleteUserById)
userRouter.put('/:userId',userController.updateUserById)

module.exports = userRouter;