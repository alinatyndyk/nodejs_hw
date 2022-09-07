const {Schema, model} = require('mongoose');

const carSchema = new Schema({
    year: {type: Number, required:true },
    model: {type: String, trim: true, required: true},
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
    timestamps: true
});

module.exports = model('car', carSchema);