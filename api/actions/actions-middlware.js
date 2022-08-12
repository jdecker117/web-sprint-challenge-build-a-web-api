// add middlewares here related to actions
const Actions = require('./actions-model')

function validateActionId(req, res, next){
    Actions.get(req.params.id)
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

function validateActionPost(req, res, next){
    if(req.body.notes == null || req.body.description == null || req.body.project_id == null){
        next({status: 400, message: "Name, Description & Project ID Required"})
        return
    }
    next();
}

module.exports = {
    validateActionId,
    validateActionPost
}