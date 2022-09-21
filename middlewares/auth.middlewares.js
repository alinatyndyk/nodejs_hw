const {ApiError} = require("../errors");
const {authService, tokenService, actionTokenService, previousPasswordService} = require("../services");
const {constant} = require("../constants")
const tokenTypeEnum = require("../constants/tokenType.enum");
const {AUTHORIZATION} = require("../constants/constant");

module.exports = {

    checkIsAccessTokenValid: async (req, res, next) => {
        try {

            const access_token = req.get(constant.AUTHORIZATION)
            console.log(req.body);

            if (!access_token) {
                return next(new ApiError('No token', 401))
            }


            tokenService.checkToken(access_token)
            console.log(access_token, 'access token auth middle')

            const tokenInfo = authService.getOneWithUser({access_token})
            console.log(tokenInfo, 'token info');
            if (!tokenInfo) {
                return next(new ApiError('No valid token', 401))
            }
            req.tokenInfo = tokenInfo;


            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsRefreshTokenValid: async (req, res, next) => {
        try {

            const refresh_token = req.get(constant.AUTHORIZATION)

            if (!refresh_token) {
                return next(new ApiError('No token', 401))
            }

            tokenService.checkToken(refresh_token, tokenTypeEnum.REFRESH)

            const tokenInfo = await authService.getOneByParams({refresh_token});

            if (!tokenInfo) {
                return next(new ApiError('No valid token', 401))
            }

            req.tokenInfo = tokenInfo;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsActionTokenValid: (tokenType) => async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);
            if (!token) {
                return next(new ApiError('No action token', 401))
            }

            tokenService.checkToken(token, tokenType);

            const tokenInfo = await actionTokenService.getOneByParamsWithUser({tokenType, token})

            if (!tokenInfo) {
                return next(new ApiError('No valid token', 401))
            }

            req.tokenInfo = tokenInfo;

            next();
        } catch (e) {
            next(e);
        }
    },


    checkPreviousPassword: async (req, res, next) => {
        try {
            const {user} = req.tokenInfo;
            const {password} = req.body;
            const oldPasswords = await previousPasswordService.getByUserId(user._id);
            console.log(oldPasswords);

            const promises = await Promise.allSettled([...oldPasswords.map(old => tokenService.comparePasswords(password, old.password)),
                tokenService.comparePasswords(password, user.password)]
            )
            for (const {status} of promises){
                if (status === 'fullfiled'){
                    return next(new ApiError('You cant user your old password', 401))
                }
            }

            console.log(promises)
            next();
        } catch (e) {
            next(e);
        }
    },

}