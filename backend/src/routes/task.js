const express = require('express')
const { Task } = require('../models/task')

const router = express.Router()

// routes

router.post('/create-task', async (req, res) => {
    try {
        const existingTask = await Task.findOne({ email: req.body.name })
        if (existingTask) return res.json({ error: 'Task already exists!' })

        const newTask = new Task({
            name: req.body.name,
            description: req.body.description,
        })

        await newTask.save()
        return res.json({ message: 'Task created!' })

    } catch (error) {
        console.log(error)
        console.error(error)
        return res.json({ error: 'Internal server error' })
    }
})

router.patch('/update-task/:id', async (req, res) => {
    try {
        const task = await Task.findOne({ id: req.body.id })
        if (!task) return res.json({ error: 'Task not found!' })

        if(req.body.name) task.name = req.body.name
        if(req.body.description) task.description = req.body.description

        await newTask.save()
        return res.json({ message: 'Task updated successfully!' })

    } catch (error) {
        console.log(error)
        console.error(error)
        return res.json({ error: 'Internal server error' })
    }
})

router.delete('/delete-task', async (req, res) => {
    try {
        const task = await Task.findOne({ email: req.body.email })
        if (!task) return res.json({ error: 'Task not found!' })

        await Task.deleteOne({id: req.params.id})

        return res.json({ message: 'task deleted successfully!' })

    } catch (error) {
        console.log(error)
        console.error(error)
        return res.json({ error: 'Internal server error' })
    }
})

module.exports = router