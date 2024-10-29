const express = require('express')
const { User } = require('../models/auth')

const router = express.Router()

router.patch('/change-details/:email', async (req, res) => {
    try {
        const user = await User.findOne({email: req.params.email})
        if(!user){
            return res.status(404).json({error: 'No user found with this email!'})
        }

        if(req.body.username) user.username = req.body.username
        if(req.body.profilePicture) user.profilePicture = req.body.profilePicture
        if(req.body.bio) user.bio = req.body.bio

        await user.save()
        return res.json({message: 'User details updated successfully!'})

    } catch (error) {
        console.log(error)
        console.error(error)
        return res.json({error: 'Internal server error'})
    }
})

module.exports = router