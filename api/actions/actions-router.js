// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')
const {validateActionId} = require('./actions-middlware')

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
    .then(result => {
        if(result == null){
            res.status(200).json([])
        }
        else{
            res.status(200).json(result)
        }
    })
})

router.get('/:id', validateActionId, (req, res) => {
    res.json(req.foundId)
})

module.exports = router