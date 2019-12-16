var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var AuthTestModel = sequelize.import('../models/authtest')

//grabs all the list items from dtabase for a given user the create function has to add data before the getAll will work
router.get('/getall', function(req,res){
    //need to get the following in sequelize:  select * from AuthTest where userid = '3'
    var userid = req.user.id
    AuthTestModel.findAll({
        where: {owner:userid}  //returns a promise so need a .then statement
    }).then(
        function findAllSuccess(data){
            res.json(data)
        }, function findAll(err){
            res.send(500,err.message)
        }
    );
});

//posting data for a given user
//localhost:3001/api/authtest/create

router.post('/create',function(req,res){
    //specifies which user:
    var owner = req.user.id 
    //grab info from body
    var authTestData = req.body.authtestdata.item

    AuthTestModel.create({
        authtestdata: authTestData,
        owner: owner
    }).then(
        function createSuccess(authtestdata){
            res.json({
                authtestdata: authtestdata
            })
        },
        function createError(err){
            res.send(500,err.message)
        }
    );
});


//to be a single item that belongs to a user
//find a single item
//localhost:30001/[primary key number]

//anything after a colon is a param
//rec.user.id is the token for the user
//authtesmodel.findone is the same as doing a sql statement to query the db

//localhost:3001/authtest/9

router.get("/:id", function(req,res){
    var primarykey = req.params.id;
    var userid = req.user.id;  
    AuthTestModel.findOne(
        {
            where: {id:primarykey, 
            owner:userid}
        }
    ).then(
        data => {return data ?res.json(data) : res.send("not authorized to view this record")
        }), (err=>res.send(500,err.message))
});

/**********************
 * delete an item for a user
***********************/

router.delete('/delete/:id', function (req,res){
    var data = req.params.id;
    var userid = req.user.id;

    AuthTestModel
    .destroy({
        where: {id: data, owner: userid}
    }).then(
        function deleteLogSuccess(data){
            res.send("you removed a log");
        },
        function deleteLogError(err){
            res.send(500,err.message);
        }
    );
});

/**********************
 * update an item for a user
***********************/

router.put('/update/:id', function(req, res) {
    var data = req.params.id;
    var authtestdata = req.body.authtestdata.item;

    AuthTestModel.update({
        authtestdata: authtestdata
    },
    {where: {id: data}}
    ).then(
        function updateSuccess(updatedLog) {
            res.json({
                authtestdata: authtestdata});
            },
        function updateError(err){
            res.send(500, err.message);
        }
    )
})


module.exports = router;