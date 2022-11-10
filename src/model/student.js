const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    id:{
        type: Number,
        unique: true,
    },
    name:{
        type: String,
    },

    major:{
        type:String,
    },
    age:{
        type:Number,
    },
    address:{
        type: String,
    },
    phone:{
        type:String,
    }
})

module.exports = mongoose.model('Student', studentSchema);

