// need to add id for thoughts and friends 
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String, 
        unique: true,
        required: true,  
        trim: true
    },
    email:{
        type: String, 
        unique: true,
        required: true,
        match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
    },
    thoughts:{

    },
    friends:{

    }
});

const User = mongoose.model('User', userSchema);

const handleError = (err) => console.error(err);


module.exports = User; 