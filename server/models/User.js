const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },   
    leaves: {
        type: Number,
        default: 0
    },
    color: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        default: false
    }

},
{timestamps: true}
)





module.exports = mongoose.model('User', userSchema)