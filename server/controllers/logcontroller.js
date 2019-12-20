var express = require('express');
var router = express.Router();
var sequelize = require("../db");
var Log = sequelize.import("../models/log");
var User = sequelize.import('../models/user');


/**********************
 * create an item for a user
***********************/
router.post('/create',function(req,res){
    var owner = req.user.id 
    //grab info from body
    var description = req.body.log.description
    var definition = req.body.log.definition
    var result = req.body.log.result
    Log.create({
        description: description,
        definition: definition,
        result: result,
        owner: owner
    }).then(
        function createSuccess(log){
            res.json({
                result: log   
            })
        },
        function crateError(err){
            res.send(500,err.message)
        }
    );
});

/**********************
 * get all logs for a user
***********************/

router.get('/getall', function(req,res){
    var userid = req.user.id
    Log.findAll({
        where: {owner:userid}
    }).then(
        function findAllSuccess(data){
            res.json(data)
        }, function findAll(err){
            res.send(500,err.message)
        }
    );
});

/**********************
 * get a log item by id
***********************/

router.get("/:id", function(req,res){
    var primarykey = req.params.id;
    var userid = req.user.id
    Log.findOne(
        {
            where: {id:primarykey, 
            owner:userid}
        }
    ).then(
        data => {return data ?res.json(data) : res.send("not authorized to view this record")
        }), (err=>res.send(500,err.message))
});

/**********************
 * update an item for a user
***********************/

router.put("/update/:id", function(req, res) {
    var userid = req.user.id;
    var primaryKey = req.params.id;
    var logdata = req.body.log.description
    
    Log.update({
        log: logdata
    },
    {where: {id: primaryKey, owner: userid}
}).then(
        data =>{
            return res.json(data)
        }
), err => res.send(500,err.message);
});

/**********************
 * delete an item for a user
***********************/

router.delete('/delete/:id', function (req,res){
    var data = req.params.id;
    var userid = req.user.id;

    Log
    .destroy({
        where: {id: data, owner: userid}
    }).then(
        function deleteLogSuccess(data){
            res.send("you removed a log item");
        },
        function deleteLogError(err){
            res.send(500,err.message);
        }
    );
});

module.exports = router;
