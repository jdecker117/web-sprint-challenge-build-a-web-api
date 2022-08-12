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

module.exports = {
    validateActionId
}