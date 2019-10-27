const express = require("express");
const User = require("../models/User_model")
const app = express();
const router = new express.Router();

router.post('/users', (req, res) =>{
    const user = new User(req.body);
    console.log("req.body : ", req.body);
    user.save().then(() => {
        res.status(201).send(user);
        console.log("req : ", user);
    }).catch((e) => {
        res.status(400).send(e);
        throw new Error("User not saved")
    })
})

router.get('/users', async (req, res) => {

    try{
        const users = await User.find();
        console.log(users);
        res.send(users)
    } catch(e){
        res.status(500).send(e);
    }
   
    
})
router.post('/users/login', async (req, res) => {
   
    try{
        console.log("user  :", req.body.email, req.body.password);
        const user = await User.findByCredentials(req.body.email, req.body.password);
        console.log("user  :", user);
        res.send(user);
    }catch(e){
        res.status(500).send(e);
    }
})

router.get('/users/:id',(req,res) => {
    const _id = req.params.id;

    User.findById(_id).then((user) =>{
        console.log(user);
        res.status(201).send(user);
    }).catch((e) =>{
        res.status(500).send(e);
    })
})

router.delete('/user/:id', async (req,res) => {
    res.status(200).send("SuccessFully Done");
});

module.exports = router;