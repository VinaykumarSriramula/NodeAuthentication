const jwt = require('jsonwebtoken');
const user = require('../models/User_model');

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer', '');
        console.log("token : ", token);
    }catch(e){
        res.status(401).send({Error : 'Please Authenticate'})
    }
}

module.exports = auth;