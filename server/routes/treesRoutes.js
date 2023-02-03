const express = require("express") ;
const router = express.Router()
const treesController = require('../controllers/treesController')
const commentsController = require ('../controllers/commentsController')
const {verifyJWTAdmin, verifyJWT} = require('../middleware/verifyJWT')





router.route('/register')
    .patch(treesController.assignTrees)

router.route('/buy')
    .post(treesController.buyTree)

router.route('/lock')
    .post(treesController.lockTree)

router.route('/comment')
    .get(commentsController.getComments)
    .post(commentsController.commentTree)
    .patch(commentsController.editComment)
    .delete(commentsController.deleteComment)

module.exports = router