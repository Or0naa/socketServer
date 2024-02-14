const userModel = require('../models/user.model')

// יצירת משתמש חדש
async function createUser(data) {
    const newUser = await userModel.create(data)
    console.log(newUser)
    return newUser
}



// קריאת כל המשתמשים
async function read(filter){
    const allUsers = await userModel.find(filter)
//    console.log(allUsers)
    return allUsers
}



async function readOne(data) {
    const user = await userModel.findOne(data).select('+password');
    console.log(user);
    return user;
}


async function update(filter, data) {
    const updateUser = await userModel.findByIdAndUpdate({_id:filter},data)
    // console.log(updateUser)
    return updateUser 
}

 function deleteUser(id) {
     const deleteUser = update(id, { isActive: false })
    // console.log(deleteUser)
    return deleteUser
   
}

module.exports = {
    createUser,
    read,
    readOne,
    update,
    deleteUser
};