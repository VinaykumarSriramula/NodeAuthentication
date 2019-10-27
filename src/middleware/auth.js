const jwt = require('jsonwebtoken');
const User = require('../models/User_model');

const auth = async (req, res, next) => {
    try {
        // console.log('auth')
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'thisismynewcourse');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        console.log('user : ', user);
        if (!user) {
            throw new Error('Error in Auth')
        }
        req.user = user;
        req.token = token;
        next()

    } catch (e) {
        res.status(401).send({ Error: 'Please Authenticate' })
    }
}

module.exports = auth;