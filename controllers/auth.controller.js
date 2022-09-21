const {authService, tokenService, emailService, actionTokenService, userService, previousPasswordService} = require("../services");
const {WELCOME} = require("../constants/emailAction.enum");
const tokenTypeEnum = require('../constants/tokenType.enum')
// const {emailActionEnum} = require("../constants");
const {AUTHORIZATION} = require('../constants/constant')
const {FORGOT_PASSWORD} = require("../constants/emailAction.enum");
const {FRONTEND_URL} = require("../configs/config");
const {sendEmail} = require("../services/email.service");
const User = require('../dataBase/User');

module.exports = {
    Login: async (req, res, next) => {
        try {
            const {password, email} = req.body;
            const {_id, name} = req.user;

            await req.user.checkIsPasswordSame(password);



            const authTokens = tokenService.createAuthTokens({_id});

            await authService.saveTokens({...authTokens, user: _id});

            await sendEmail(email, WELCOME, {userName: name});
            res.json({
                ...authTokens,
                user: req.user
            })
        } catch (e) {
            next(e);
        }
    },

    Refresh: async (req, res, next) => {
        try {
            const {user, refresh_token} = req.tokenInfo;
            await authService.deleteOneByParams({refresh_token})

            const authTokens = tokenService.createAuthTokens({_id: user});

            const newTokens = await authService.saveTokens({...authTokens, user});

            res.json(newTokens)
        } catch (e) {
            next(e);
        }
    },

    ForgotPassword: async (req, res, next) => {
        try {
            const {email, _id} = req.user;

            const actionToken = tokenService.createActionToken(tokenTypeEnum.FORGOT_PASSWORD, {_id});

            const url = `${FRONTEND_URL}/password/forgot-pass-page?token=${actionToken}`

            await emailService.sendEmail(email, FORGOT_PASSWORD, {url});
            await actionTokenService.createActionToken({
                tokenType: FORGOT_PASSWORD,
                user: _id,
                token: actionToken
            })

            res.json('ok');
        } catch (e) {
            next(e);
        }
    },

    Logout: async (req, res, next) => {
        try {
            const {user, access_token} = req.tokenInfo;
            await authService.deleteOneByParams({user, access_token})

            res.sendStatus(600)
        } catch (e) {
            next(e);
        }
    },

    SetNewPassword: async (req, res, next) => {
        try {
            const {user} = req.tokenInfo;
            const {password} = req.body;
            const token = req.get(AUTHORIZATION)

            await previousPasswordService.savePasswords({password: user.password, user: user._id});
            await authService.deleteManyByParams({user: user._id});
            // await actionTokenService.deleteOne({token})

            const hashPassword = await tokenService.hashPassword(password)
            await userService.updateUserById(user._id, {...req.body, password: hashPassword});

            res.json('OK')
        } catch (e) {
            next(e)
        }

    }
}