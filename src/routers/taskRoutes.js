const express = require('express')
const router = new express.Router()
const Task = require('../models/task')

router.post('/task', async (req,res)=>{
    const task = await new Task(req.body)
    try {
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/task', async(req,res)=>{
    const tasks = await Task.find({})
    try {
        res.send(tasks)
    } catch (e) {
        res.status(500).send("ERROR!", e)
    }
})

router.get('/task/:id',async(req,res)=>{
    const _id = req.params.id
    const task = await Task.findById(_id)
    try {
        res.send(task)
    } catch (e) {
        res.status(500).send("ERROR!", e)
    }
})

router.patch('/task/:id', async(req,res)=>{
    const _id = req.params.id
    const task = await Task.findByIdAndUpdate(_id, req.body, {runValidators: true, new: true})
    try {
        if(!task){
            res.status(404).send("Task not found")
        }
        res.send(task)
    } catch (e) {
        res.status(500).send("ERROR!")
    }
})

router.delete('/task/:id', async(req,res)=>{
    const _id = req.params.id
    const task = await Task.findByIdAndDelete(_id)
    try {
        if(!task){
            res.status(404).send("Task not found")
        }
        res.send(task)
    } catch (e) {
        res.status(500).send("ERROR!")
    }
})

module.exports = router