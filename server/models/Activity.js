const mongoose = require('mongoose');


const activitySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    tree_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Tree'
    },
    type: {
        type: String,
        required: true,
    }
},
{timestamps: true}
)





module.exports = mongoose.model('Activity', activitySchema)