const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4(),
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    },
    bio: {
        type: String
    }
})

const User = mongoose.model("Auth", UserSchema);
module.exports = { User }