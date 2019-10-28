const express = require("express");
const User = require("../models/User_model");
const auth = require('../middleware/auth.js');
const router = new express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save();
        console.log('user :  ', req.user);
        res.send("Logged Out Successfully");
    } catch (e) {
        res.status(500).send('Unable to logout');
    }
})
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send("Logged Out of all Sessions")
    } catch (e) {
        res.status(500).send('Unable to logout all sessions');
    }
})
router.post('/users/login', async (req, res) => {

    try {
        console.log("user  :", req.body.email, req.body.password);
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        // console.log("user  :", token);
        res.send({ user, token });
    } catch (e) {
        res.status(500).send(e);
    }
})
router.patch('/users/me', auth ,async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if(!isValidOperation){
        res.status(500).send('Please update Valid Key')
    }
    try{
        updates.forEach((update) => {
            req.user[update] = req.body[update];
        })
        await req.user.save();
        res.status(200).send(req.user)
    }catch(e){
        res.status(400).send('Unable to update User');
    }
})
router.get('/users/:id', (req, res) => {
    const _id = req.params.id;

    User.findById(_id).then((user) => {
        console.log(user);
        res.status(201).send(user);
    }).catch((e) => {
        res.status(500).send(e);
    })
})

router.delete('/user/me', auth, async (req, res) => {
    console.log("delete profile");
    try{
    await req.user.remove();
    res.send(req.user);
    }catch(e){
        res.status(500).send('unable to delete profile')
    }
    // const user = await User.findByIdAndDelete(req.user._id);
    // res.status(200).send("SuccessFully Deleted");
});

module.exports = router;