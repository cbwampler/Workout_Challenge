var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');


//SIGNING IN A USER

router.post("/", function(req,res){
    let email = req.body.user.username;
    let password = req.body.user.password;

    User.findOne({
        where:{username:email}
    }).then(user => {
    
    user ? comparePasswords(user) : res.send("User not found in our database")

    function comparePasswords(user){
        bcrypt.compare(password, user.passwordhash, function (err, matches){
            matches ? generateToken(user):res.send ("Incorrect Password")
        }) 
    }
    function generateToken(user){
        var token = jwt.sign({id: user.id }, process.env.JWT_SECRET,{
            expiresIn: 60*60*24
        });
        res.json({
            user:user,
            message:'created',
            sessionToken:token
        })
    }
})
})

module.exports =  router