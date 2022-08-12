// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')
const {validateActionId, validateActionPost} = require('./actions-middlware')

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

router.post('/', validateActionId, validateActionPost,(req, res) => {
    Actions.insert(req.body)
    .then(result => {
        res.status(201).json(result)
    })
})

router.put('/:id', validateActionId, validateActionPost, (req, res) => {
    if(req.body.completed == null){
        res.status(400).json({message: "Name, Description, Project Id, and Completed required"})
    }
    else{
        Actions.update(req.params.id, req.body)
            .then(result => {
                console.log(res)
                res.status(200).json(result)
            })
    }
})

router.delete('/:id', validateActionId, (req, res) => {
    Actions.remove(req.params.id)
    .then(result => {
        res.status(200).json(result)
    })
})
module.exports = router