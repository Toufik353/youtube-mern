const express = require("express")
const app = express()
const router = express.Router()
const { signup ,login } = require("../controllers/user.cotroller.js")
const {authMiddleware} = require("../middleware/authMiddleware.js")

// use registration router

router.post("/signup", signup)

router.post("/login",login)

module.exports = router