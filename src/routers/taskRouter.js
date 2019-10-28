const express = require('express');
const Task = require('../models/Task_model');
const auth = require('../middleware/auth.js');
const router = new express.Router();

router.post('/tasks', auth, async (req, res) => {
    console.log('inside task');
    const task = new Task({
        ...req.body,
        owner : req.user._id
    });
    try{
        await task.save();
        res.status(200).send(task);
    }catch(e){
        res.status(500).send('Unable to save task')
    }
});

router.get('/tasks', auth, async (req, res)=> {
    try{
        //const tasks = await Task.findOne({});
        await req.user.populate('tasks').execPopulate()
        res.status(200).send(req.user.tasks);
    }catch(e){
        res.status(500).send('Unable to get Tasks')
    }
});

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
});

router.get('/tasks/:id', auth, async (req, res)=> {
    const id = req.params._id;
    try{
        const task = await Task.findOne({id, owner: req.user._id});
        res.status(200).send(task)
    }catch(e){
        res.status(500).send('Unable to get Tasks')
    }
});

module.exports = router;