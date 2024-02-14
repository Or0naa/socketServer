

const mongoose = require('mongoose')
const messageSchema = new mongoose.Schema({
   
    message: {
        type: String,
        // required: true
    },
    user: {
        type: String,
        // required: true
    },
    createdDate:{
        type:Date,
        default: Date.now
    }
})
const messageModel = mongoose.model('message', messageSchema)

module.exports = messageModel;
