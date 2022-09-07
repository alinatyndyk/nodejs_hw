const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {ApiError} = require('../errors')

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),
    comparePasswords: async (password, hashPassword) => {
        let arePasswordsSame = await bcrypt.compare(password, hashPassword)

        if (!arePasswordsSame) {
            throw new ApiError("wrong pass", 400)
        }
    },

    createAuthTokens: (payload)=>{
       const access_token = jwt.sign(payload, "ACCESS WORD", {expiresIn: '10m'})
       const refresh_token = jwt.sign(payload, "REFRESH WORD", {expiresIn: '30d'})

        return{
           access_token,
            refresh_token
        }
    }
}