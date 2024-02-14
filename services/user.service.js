const usersController = require('../DL/controllers/user.controller')
const { createUser, read, readOne, update, deleteUser } = usersController

async function addNewUser(data) {
console.log(data)
    let mail = data.email
    let users = await usersController.readOne({ email: mail })
    if (users){
        throw { code: 400, msg: 'User already exists' }
    }
    
    let body = {
        email : data.email,
        password : data.password,
        fName: data.fName,
        lName: data.lName,
        permission : "user"
    }
    const newUser = await usersController.createUser(body)
    console.log(newUser)
    return newUser
}

// addNewUser({
//     email: "or0naa@gmail.com",
//     password: "1234",
//     fName: "orna",
//     lName: "ben avraham",
//     permission : "admin"
// })


async function getAllUsers(filter) {
    let users = await usersController.read(filter)
    // console.log(users)
    if (!users.length) {
        console.log('no users')
    }
    return users
}
async function getUser(filter) {
    let user = await usersController.readOne(filter)
    // console.log(user)
    if (!user) {
        console.log('No user found')
    }
    return user
}



async function updateUser(filter, data) {
    const updateUser = await usersController.update(filter, data)
    // console.log(updateUser)
    return updateUser
}


async function del(id) {
    const deleteUser = await usersController.deleteUser(id)
    // console.log(deleteUser)
    return deleteUser
}




module.exports = { addNewUser, getAllUsers, getUser, updateUser, del }