// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')
const {validateProjectId, validateProjectPost} = require('./projects-middleware')

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
    .then(result => {
        if(!result){
            res.status(200).json([])
        }
        else{
            res.status(200).json(result)
        }
    })
})

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.foundId)
})

router.post('/', validateProjectPost, (req, res) => {
    Projects.insert(req.body)
    .then(result => {
        res.status(201).json(result)
    })
})

router.put('/:id', validateProjectId, validateProjectPost, (req, res) => {
    if(req.body.completed == null){
        res.status(400).json({message: "Name, Description, and Completed required"})
    }
    else{
        Projects.update(req.params.id, req.body)
            .then(result => {
                console.log(res)
                res.status(200).json(result)
            })
    }
})

router.delete('/:id', validateProjectId, (req, res) => {
    Projects.remove(req.params.id)
    .then(result => {
        res.status(200).json(result)
    })
})

router.get('/:id/actions', validateProjectId, (req, res) => {
    Projects.getProjectActions(req.params.id)
    .then(result => {
        res.status(200).json(result)
    })
})

module.exports = router