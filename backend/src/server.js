const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRoutes = require('./routes/auth')
const profileRoutes = require('./routes/profile')
const taskRoutes = require('./routes/task')
const jwt = require('jsonwebtoken')

const app = express();
app.use(cors());
app.use(express.json())

// DB connection
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

// middleware to authorize
const verifyToken = (req, res, next) => {
    const token = req.headers['token']
    if(!token) return res.status(403).json({error: 'Unauthorized (no token)'})

    jwt.verify(token, 'jwtSecret', (err, decoded) => {
        if(err) return res.status(401).json({error: 'Unauthorized because of faulty token'})
        req.user = decoded;
        next()
    })
}

// home route
app.get('/', (req, res) => {
    res.send("Hello world!")
})

// authentication test route
app.get('/auth-test', verifyToken, (req, res) => {
    res.send("You are authorized to visit this page!")
})

// auth routes
app.use('/auth', authRoutes)

// protected routes
app.use('/profile', verifyToken, profileRoutes)
app.use('/task', verifyToken, taskRoutes)

// can be taken from env var as well
const PORT = 9001

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
