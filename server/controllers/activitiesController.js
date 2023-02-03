const asyncHandler = require('express-async-handler')
const Activity = require('../models/Activity')


//@desc Get all activities
//@route GET /activities
//@access Private

const getActivities = asyncHandler(async (req,res) => {

    const foundActivities = await Activity.find().exec()

    res.json(foundActivities)
})

module.exports = {
    getActivities
}