const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRoutes = require('./routes/auth')
const jwt = require('jsonwebtoken')

const app = express();
app.use(cors());
app.use(express.json())

const db = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/test')
    } catch (error) {
        console.error(error)
        console.log(error)
        process.exit(1)
    }
}
db();

// middleware
const verifyToken = (req, res, next) => {
    const token = req.headers['token']
    if(!token) return res.status(403).json({error: 'Unauthorized (no token)'})

    jwt.verify(token, 'jwtSecret', (err, decoded) => {
        if(err) return res.status(401).json({error: 'Unauthorized because of faulty token'})
        req.user = decoded;
        next()
    })
}

app.get('/', (req, res) => {
    res.send("Hello world!")
})

app.get('/auth-test', verifyToken, (req, res) => {
    res.send("You are authorized to visit this page!")
})

app.use('/auth', authRoutes)

app.listen(9000, () => {
    console.log("server running on port 9000")
})
