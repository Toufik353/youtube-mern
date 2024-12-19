const User = require("../models/user.model.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const signup = async (req,res) => {
    try {
        const { username, email, password } = req.body
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "Email already exists" })
        }
        const hashedPasword = await bcrypt.hash(password, 10)
        console.log("has",hashedPasword)

        const newUser = await User.create({ username, email, password:hashedPasword })
        res.status(201).json({ message: "User created successfully", user: newUser })

    } catch (err) {
        res.status(500).json({message: err.message})
        
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Email is not registerd!!" })
        }
        const isValidPassword = await bcrypt.compare(password, user.password)

        console.log("password", password)
        console.log("user.password",user.password)
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid password!!" })  
        }

        const token = jwt.sign({ user: user._id },"secret-key",{expiresIn:'2h'})

        res.status(200).json({ message: "User logged in successfully",token, user })
        
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

module.exports = {signup,login}