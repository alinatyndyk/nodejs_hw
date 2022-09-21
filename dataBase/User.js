const {Schema, model} = require('mongoose');
const tokenService = require("../services/token.service");

const userSchema = new Schema({
    name: {type: String, trim: true, required: true},
    age: {type: Number, default: 18},
    email: {type: String, trim: true, lowercase: true},
    password: {type: String, required: true},
    cars: {
        type: [Schema.Types.ObjectId],
        ref: 'car',
        select: false
    }
}, {
    timestamps: true
});

userSchema.statics =  {
    testStatic() {
        console.log("---------");
        console.log("this is static");
        console.log(this);
        console.log("---------");
    },

    async createUserWithHashPassword(userObject ={}) {
        const hashPassword = await tokenService.hashPassword(userObject.password)
        return this.create({...userObject, password: hashPassword});
    }
}

userSchema.methods = {
    testMethod() {
        console.log("---------");
        console.log("this is method");
        console.log(this);
        console.log("---------");
    },

    async checkIsPasswordSame(password){
        await tokenService.comparePasswords(password, this.password);
    }
}

module.exports = model('user', userSchema);