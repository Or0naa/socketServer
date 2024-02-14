const messageModel = require('../models/message.model')

// יצירת משתמש חדש
async function createmessage(data) {
    const newmessage = await messageModel.create(data)
    console.log(newmessage)
    return newmessage
}



// קריאת כל המשתמשים
async function read(filter){
    const allmessages = await messageModel.find(filter)
//    console.log(allmessages)
    return allmessages
}



async function readOne(data) {
    const message = await messageModel.findOne(data).select('+password');
    console.log(message);
    return message;
}


async function update(filter, data) {
    const updatemessage = await messageModel.findByIdAndUpdate({_id:filter},data)
    // console.log(updatemessage)
    return updatemessage 
}

 function deletemessage(id) {
     const deletemessage = update(id, { isActive: false })
    // console.log(deletemessage)
    return deletemessage
   
}

module.exports = {
    createmessage,
    read,
    readOne,
    update,
    deletemessage
};