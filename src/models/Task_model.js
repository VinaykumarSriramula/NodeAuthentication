const mongoose = require('mongoose');

const taskScheme = new mongoose.Schema({
    description : {
        type : String,
        required : true,
        trim : true

    },
    isCompleted :{
        type : Boolean
        //required : true
    },
    owner :{
     type : mongoose.Schema.Types.ObjectId,
     required : true
    }
});

const Task = mongoose.model('Task', taskScheme)

module.exports = Task;