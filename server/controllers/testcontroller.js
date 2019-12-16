var express = require('express');
var router = express.Router();
var sequelize = require("../db");
var TestModel = sequelize.import("../models/test");

router.get("/helloclient",function(req,res){
    res.send("Hello from helloclient")
})

router.post('/one',function(req,res){
    res.send('test 1 went through')
})
router.post('/two', function(req,res){
    let data = "this is test data"
    TestModel.create({
        testdata:data,
        firstname:"Carolyn"
    }).then(res.send('test data success'))
})

router.post('/three', function(req,res){
    let newTestData = req.body.testdata
    let newFirstName = req.body.threeFirstName
    TestModel.create({
        testdata: newTestData,
        firstname:newFirstName       
    }).then(res.send('test data 3 success'))
})

router.post('/four', function(req,res){
    var testData4 = req.body.testdata.item;
    TestModel.create({
        testdata:testData4
    }).then(res.send('test #4 went through!'))
})

router.post('/five',function(req,res){
    var testData = req.body.testdata.item;
    TestModel.create({
        testdata: testData
    })
    .then( function message(data) {
        res.send(data);
    }
)})

router.post('/six', function(req,res){
    var testData = req.body.testdata.item;
    TestModel.create({
        testdata: testData,
        firstname:"Joe"
    })
    .then(
        function message(testdata){
            res.json({
                testdata:testdata
            })
        }
    )
})

router.post('/seven', function (req, res) {
    var testData = req.body.testdata.item;

    TestModel
    .create({
        testdata: testData
    })
    .then(
        function createSuccess(testdata) {
        res.json({
            testdata: testdata
        });

        },
        function createError(err) { 
        res.send(500, err.message);
        }
    );
});

router.get('/one', function(req, res) {

    TestModel
      .findAll({ //1
        attributes: ['id', 'testdata']
    })
    .then(
        function findAllSuccess(data) {
            console.log("Controller data:", data);
            res.json(data);
        },
        function findAllError(err) {
            res.send(500, err.message);
        }
    );
});






router.get('/', function(req,res){
    res.send("Hey! This is from the test route.")
})

module.exports = router
