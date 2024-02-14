const messagesController = require('../DL/controllers/message.controller')
const { createmessage, read, readOne, update, deletemessage } = messagesController

async function addNewmessage(data) {
let newMessage = {
        message: data.message,
        user: data.user,
    } 
    const newmessage = await messagesController.createmessage(newMessage)
    // console.log(newmessage)
    return newmessage
}

// addNewmessage({
//     user: "65cc8e5d3a959db39f9175d1",
//     message: "world"
// })


async function getAllmessages(filter) {
    let messages = await messagesController.read(filter)
    // console.log(messages)
    if (!messages.length) {
        console.log('no messages')
    }
    return messages
}
async function getmessage(filter) {
    let message = await messagesController.readOne(filter)
    // console.log(message)
    if (!message) {
        console.log('No message found')
    }
    return message
}



async function updatemessage(filter, data) {
    const updatemessage = await messagesController.update(filter, data)
    // console.log(updatemessage)
    return updatemessage
}


async function del(id) {
    const deletemessage = await messagesController.deletemessage(id)
    // console.log(deletemessage)
    return deletemessage
}




module.exports = { addNewmessage, getAllmessages, getmessage, updatemessage, del }