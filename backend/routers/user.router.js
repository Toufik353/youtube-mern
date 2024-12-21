const express = require("express")
const app = express()
const router = express.Router()
const { signup ,login } = require("../controllers/user.cotroller.js")
const {authMiddleware} = require("../middleware/authMiddleware.js")

// user registration router
router.post("/signup", signup)

// Login router
router.post("/login",login)

module.exports = router