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
        const tasks = await Task.findOne({});
        res.status(200).send(tasks)
    }catch(e){
        res.status(500).send('Unable to get Tasks')
    }
})

module.exports = router;