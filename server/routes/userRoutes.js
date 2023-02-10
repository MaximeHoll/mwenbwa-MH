const express = require("express") ;
const router = express.Router()
const usersController = require('../controllers/usersController')
const {verifyJWTAdmin, verifyJWT} = require('../middleware/verifyJWT')


router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(verifyJWTAdmin,usersController.deleteUser)

router.route('/profile')
    .post(usersController.getUser)

module.exports = router
