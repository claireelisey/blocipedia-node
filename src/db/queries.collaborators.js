const Collaborator = require("./models").Collaborator;
const Wiki = require("./models").Wiki;
const User = require("./models").User;
const Authorizer = require("../policies/application");

module.exports = {

    addCollaborator(req, callback) {

        if (req.user.username == req.body.collaborator){
            return callback("You cannot add yourself as a collaborator.");
        }
        User.findAll({
            where: {
                username: req.body.collaborator
            }
        })
        .then((users)=>{
            if(!users[0]){
                return callback("User does not exist.");
            }
            Collaborator.findAll({
                where: {
                    userId: users[0].id,
                    wikiId: req.params.wikiId,
                }
            })
            .then((collaborators)=>{
                if(collaborators.length != 0){
                    return callback(`${req.body.collaborator} is already a collaborator on this wiki.`);
                }
                let newCollaborator = {
                    userId: users[0].id,
                    wikiId: req.params.wikiId
                };
                return Collaborator.create(newCollaborator)
                .then((collaborator) => {
                    callback(null, collaborator);
                })
                .catch((err) => {
                    callback(err, null);
                })
            })
            .catch((err)=>{
                callback(err, null);
            })
        })
        .catch((err)=>{
            callback(err, null);
        })
    },

    deleteCollaborator(req, callback) {
        let userId = req.body.collaborator;
        let wikiId = req.params.wikiId;

        const authorized = new Authorizer(req.user, wiki, userId).destroy();

        if (authorized) {
            Collaborator.destroy({
                    where: {
                        userId: userId,
                        wikiId: wikiId
                    }
                })
                .then((deletedRecordsCount) => {
                    callback(null, deletedRecordsCount);
                })
                .catch((err) => {
                    callback(err);
                });
        } else {
            req.flash("notice", "You are not authorized to do that.");
            callback(401);
        }
    }

}