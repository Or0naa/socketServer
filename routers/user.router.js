const express = require('express')
const router = express.Router()
const userService = require('../services/user.service')
const { getAllUsers, getUser, addNewUser, updateUser, del } = userService



router.get('/', async (req, res) => {
    try{
        res.send( await userService.getAllUsers())
    } catch (err) {
        res.status(400).send(err)
    }
})

// get single user
router.get('/:userId', async (req, res) => {
try{
    res.send(await userService.getUser(req.params.userId))
} catch (err) {
    res.status(400).send(err)
}
})


// router.post('/',async ( req, res) => { 
//     try{
//     res.send(await userService.addNewUser(req.body))
//     } catch (err) {
//         res.status(err ?? 400).send(err)
//     }
// })

router.post('/login', async (req, res) => {
    try {
        const user = await userService.getUser({ email: req.body.email })
        if (user) {
            const isMatch = user.password === req.body.password;
            if (isMatch) {
                res.send(user)
            } else {
                res.status(400).send('Wrong password')
            }
        } else {
            res.status(400).send('User not found')
        }
    } catch (err) {
        res.status(400).send("Error logging in");
    }
})

router.post('/register', async (req, res) => {
   
    try {
        const user = await userService.getUser({ email: req.body.email });
        if (user) {
            return res.status(400).send('User already exists');
        }

        const newUser = {
            email: req.body.email,
            password: req.body.password,
            fName: req.body.fName,
            lName: req.body.lName,
        };
    res.send(await userService.addNewUser(newUser))
// res.send(createdUser);
    } catch (err) {
        res.status(400).send("Error creating user");
    }
});


router.put('/:id',async (req, res) => { 
    try{
        console.log(req.params.id)
        console.log(req.body)
        res.send(await userService.updateUser(req.params.id, req.body))
    } catch (err) {
        res.status(400).send(err)
    }
 })
router.delete('/:id', (req, res) => {
    try {
        res.send(userService.del(req.params.id))
    } catch (err) {
        res.status(400).send(err)
    }
})



module.exports = router