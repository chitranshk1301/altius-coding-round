const express = require('express')
const { User } = require('../models/auth')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router()

// auth endpoints
router.post('/register', async (req, res) => {
    try {
        const existingUser = await User.findOne({email: req.body.email})
        if(existingUser) return res.json({error: 'User with this email already exist!'})

        // hashing the password 
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        await newUser.save()
        return res.json({message: 'User registered successfully!'})

    } catch (error) {
        console.log(error)
        console.error(error)
        return res.json({error: 'Internal server error'})
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user) return res.json({error: 'User does not exit, kindly register.'})

        const passwordMatch = await bcrypt.compare(req.body.password, user.password)
        if(!passwordMatch) return res.json({error: 'Invalid credentials!'})

        const token = jwt.sign({ email: user.email }, 'jwtSecret')
        return res.json({ token });
    } catch (error) {
        return res.json({ error: 'Internal server error' })
    }
})

module.exports = router