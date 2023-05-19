// need to add date format
const mongoose = require('mongoose');


const thoughtSchema = new mongoose.Schema({
    thoughtText:{
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    username:{
        type:String,
        required:true
    },
    reactions:{

    }
})

const Thought = mongoose.model('Thought', thoughtSchema);

const handleError = (err) => console.error(err);


module.exports = Thought; 