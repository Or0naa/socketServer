const express = require('express')
const router = express.Router()
const messageService = require('../services/message.service')
const { getAllmessages, getmessage, addNewmessage, updatemessage, del } = messageService



router.get('/', async (req, res) => {
    try{
        res.send( await messageService.getAllmessages())
    } catch (err) {
        res.status(400).send(err)
    }
})

// get single message
router.get('/:messageId', async (req, res) => {
try{
    res.send(await messageService.getmessage(req.params.messageId))
} catch (err) {
    res.status(400).send(err)
}
})


router.post('/',async ( req, res) => { 
    console.log(req.body)
    try{
    res.send(await messageService.addNewmessage(req.body))
    } catch (err) {
        res.status(err ?? 400).send(err)
    }
})

router.put('/:id',async (req, res) => { 
    try{
       
        res.send(await messageService.updatemessage(req.params.id, req.body))
    } catch (err) {
        res.status(400).send(err)
    }
 })
router.delete('/:id', (req, res) => {
    try {
        res.send(messageService.del(req.params.id))
    } catch (err) {
        res.status(400).send(err)
    }
})



module.exports = router