const {ApiError} = require("../errors");
const {carService, authService, tokenService} = require("../services");
const {constant, tokenType} = require("../constants")
const tokenTypeEnum = require("../constants/tokenType.enum");

module.exports = {

    checkIsAccessTokenValid: async (req, res, next) => {
        try {

            const access_token = req.get(constant.AUTHORIZATION)

            if(!access_token){
                return next(new ApiError('No token', 401))
            }

            tokenService.checkToken(access_token)

            const tokenInfo = authService.getOneWithUser({access_token})

            if(!tokenInfo){
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

            if(!refresh_token){
                return next(new ApiError('No token', 401))
            }

            tokenService.checkToken(refresh_token, tokenTypeEnum.REFRESH)

            const tokenInfo = await authService.getOneByParams({refresh_token});

            if(!tokenInfo){
                return next(new ApiError('No valid token', 401))
            }

            req.tokenInfo = tokenInfo;
            next();
        } catch (e) {
            next(e);
        }
    }

}