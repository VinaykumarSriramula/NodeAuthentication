const jwt = require('jsonwebtoken');
const User = require('../models/User_model');

const auth = async (req, res, next) => {
    try {
        // console.log('auth')
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'thisismynewcourse');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error('Error in Auth')
        }
        req.token = token;
        req.user = user;
        
        next()

    } catch (e) {
        res.status(401).send({ Error: 'Please Authenticate' })
    }
}

module.exports = auth;