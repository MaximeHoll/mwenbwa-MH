const express = require("express") ;
const router = express.Router()
const treesController = require('../controllers/treesController')
const {verifyJWTAdmin, verifyJWT} = require('../middleware/verifyJWT')





router.route('/register')
    .patch(treesController.assignTrees)

router.route('/buy')
    .post(treesController.buyTree)

module.exports = router