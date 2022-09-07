const {authService} = require("../services");
module.exports = {
    Login: async (req, res, next) => {
        try {
            const {password} = req.body;
            const {password: hashPassword, _id} = req.user;

            await authService.comparePasswords(password, hashPassword);

            const authTokens = authService.createAuthTokens({_id});
            res.json({
                ...authTokens,
                user: req.user
            })
        } catch (e) {
            next(e);
        }
    }
}