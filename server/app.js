require('dotenv').config();
var express = require('express');
var app = express();
var test = require('./controllers/testcontroller')
var sequelize = require('./db')
var bodyParser = require("body-parser");
var user = require('./controllers/usercontroller')
var login = require('./controllers/logincontroller')
var log = require('./controllers/logcontroller')
var authTest = require('./controllers/authtestcontroller')

sequelize.sync()
app.use(bodyParser.json());
app.use(require('./middleware/header'))  //this has to be done after body parser

//req = request res = response

// app.get("/", function(req, res){
//     res.send("Hello!")
// })

// app.use('/api/test/', function(req,res){
//     res.send("This is data from the api/test/ endpoint")
// })

// app.get('/about-me/', function(req,res){
//     res.send("I am old enough to know better but don't.  I am originally from Buffalo, New York")
// })

app.use('/api/user', user )
app.use('/api/login',login )

//create route-- anything after middleware requires a token
app.use(require('./middleware/validate-session'))
app.use('/logcontroller',log)
app.use('/test-controller', test)
app.use('/authtest',authTest)

app.listen(3001, function(){
    console.group("app is listening on port 3001")
})