const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {ApiError} = require('../errors')
const {ACCESS_SECRET_WORD, REFRESH_SECRET_WORD, ACCESS_TOKEN_LIFETIME, REFRESH_TOKEN_LIFETIME} = require("../configs/config");
const tokenTypeEnum = require("../constants/tokenType.enum");

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),
    comparePasswords: async (password, hashPassword) => {
        let arePasswordsSame = await bcrypt.compare(password, hashPassword)

        if (!arePasswordsSame) {
            throw new ApiError("wrong pass", 400)
        }
    },

    createAuthTokens: (payload) => {
        const access_token = jwt.sign(payload, ACCESS_SECRET_WORD, {expiresIn: ACCESS_TOKEN_LIFETIME})
        const refresh_token = jwt.sign(payload, REFRESH_SECRET_WORD, {expiresIn: REFRESH_TOKEN_LIFETIME})

        return {
            access_token,
            refresh_token
        }

    },
    
    checkToken:(token, tokenType = tokenTypeEnum.ACCESS)=>{
        try{
            let word;
            if(tokenType === tokenTypeEnum.ACCESS) word = ACCESS_SECRET_WORD
            if(tokenType === tokenTypeEnum.REFRESH) word = REFRESH_SECRET_WORD

            return jwt.verify(token, word)
        }catch (e) {
            throw new ApiError('Token not valid', 400)
        }
    }
}