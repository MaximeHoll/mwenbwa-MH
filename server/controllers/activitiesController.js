const asyncHandler = require('express-async-handler')
const Activity = require('../models/Activity')
const Tree = require('../models/Tree')
const User = require('../models/User')


//@desc Get all activities
//@route GET /activities
//@access Private

const getActivities = asyncHandler(async (req,res) => {

    const foundActivities = await Activity.find().exec()
    const allActivities = []

    for(let i = 0; i < foundActivities.length; i++) {
        let userTreeActivity = []
        const user = await User.findById({"_id" : foundActivities[i].user_id}).exec()
        const tree = await Tree.findById({"_id" : foundActivities[i].tree_id}).exec()
        userTreeActivity.push(user.username, tree.random_name, foundActivities[i].type, foundActivities[i].createdAt)
        allActivities.push(userTreeActivity)
    }

    res.json(allActivities)
})

module.exports = {
    getActivities
}