require("dotenv").config();
const User = require("./models").User;
const bcrypt = require("bcryptjs");
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {

    createUser(newUser, callback){

        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(newUser.password, salt);

        return User.create({
            username: newUser.username,
            email: newUser.email,
            password: hashedPassword
        })
        .then((user) => {
            const msg = {
                to: user.email,
                from: 'donotreply@example.com',
                subject: 'Blocipedia Account Confirmation',
                text: 'Succcess! Your Blocipedia account has been created.',
                html: '<strong>Start creating!</strong>',
            };
            sgMail.send(msg);
            callback(null, user);
        })
        .catch((err) => {
            callback(err);
        })
    },

    getUser(id, callback){
        return User.findById(id)
        .then((user) => {
            callback(null, user);
        })
        .catch((err) => {
            callback(err);
        })
    },

    changeRole(user){
        User.findOne({
            where: {email: user.email}
        })
        .then((user) => {
            if(user.role == "standard"){
                user.update({
                    role: "premium"
                });
            } else if(user.role == "premium"){
                user.update({
                    role: "standard"
                });
            }
        })
    }

}