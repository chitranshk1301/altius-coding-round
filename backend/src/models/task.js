const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const TaskSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4(),
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    }
})

const Task = mongoose.model("Task", TaskSchema);
module.exports = { Task }