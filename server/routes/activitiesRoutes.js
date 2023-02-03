const express = require("express") ;
const router = express.Router()
const activitiesController = require('../controllers/activitiesController')






router.route('/')
    .get(activitiesController.getActivities)



module.exports = router