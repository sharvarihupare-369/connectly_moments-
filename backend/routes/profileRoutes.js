const express = require("express")
const { createProfile , getProfile, editProfile, deleteProfile} = require("../controllers/profileController")
const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router()

router.post('/create', authMiddleware, createProfile)
router.get('/',authMiddleware, getProfile)
router.put('/edit', authMiddleware, editProfile)
router.delete('/delete', authMiddleware, deleteProfile)

module.exports = router