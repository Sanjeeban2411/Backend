const express = require('express')
const router = new express.Router()
const User = require('../models/user')

const auth = require('../middlewares/auth')

router.post('/user',async (req,res)=>{
    const user = await new User(req.body)
    try {
        const token = await user.generateAuthToken()
        // await user.save()
        res.send({user, token})
        // res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/user/login',async(req,res)=>{
    try {
        const user = await User.findOneByCred(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
        // res.send(user)
        // res.send('user')
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/user/logout', auth, async(req,res,next)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send(req.user, "logged out")
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/user/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/user/me',auth, async (req,res)=>{
    // const users = await User.find({})
    // const user = req.user
    // try {
    //     res.send(user)
    // } catch (e) {
    //     res.status(500).send("ERROR!", e)
    // }
    res.send(req.user)
})

router.get('/user/:id',async(req,res)=>{
    const _id = req.params.id
    const user = await User.findById(_id)
    try {
        res.send(user)
    } catch (e) {
        res.status(500).send("ERROR!",e)
    }
})

router.patch('/user/:id', async(req,res)=>{
    const _id = req.params.id
    const user = await User.findByIdAndUpdate(_id, req.body, {runValidators: true, new: true})
    try {
        if(!user){
            res.status(404).send("User not found")
        }
        res.send(user)
    } catch (e) {
        res.status(500).send("ERROR!")
    }
})

router.delete('/user/:id', async(req,res)=>{
    const _id = req.params.id
    const user = await User.findByIdAndDelete(_id)
    try {
        if(!user){
            res.status(404).send("User not found")
        }
        res.send(user)
        // res.send(JSON.parse(user).name)
    } catch (e) {
        res.status(500).send("ERROR!")
    }
})

module.exports = router