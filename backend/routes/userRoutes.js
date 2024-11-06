const express = require("express")
const UserController = require("../controllers/UserController")
const validateMiddleware = require("../middleware/validationMiddleware")
const router = express.Router()

router.post("/signup", validateMiddleware,UserController.signup)
router.post("/login",UserController.login)
router.post("/logout",UserController.logout)


module.exports = router