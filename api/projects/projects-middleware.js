// add middlewares here related to projects
const Projects = require('./projects-model')

function validateProjectId(req, res, next){
    Projects.get(req.params.id)
    .then(result => {
        if(result == null){
            res.status(404).json({message: "The project could not be found"})
        }
        else{
            req.foundId = result
            next()
        }
    })
}

function validateProjectPost(req, res, next){
    if(req.body.name == null || req.body.description == null){
        next({status: 400, message: "Name & Description Required"})
        return
    }
    next();
}

module.exports = {
    validateProjectId,
    validateProjectPost
}