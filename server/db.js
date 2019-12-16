const Sequelize = require('sequelize');

const sequelize = new Sequelize('workoutlog','postgres','password',{
    host:'localhost',
    dialect: 'postgres'
});

//below is the big arrow function.  Using regular function instead.
// sequelize
// .authenticate()
// .then(() => {
//     console.log('Connection has been established successfully.');
// })
// .catch(err => {
//     console.error ('Unable to connect to the database:', err);
// });

sequelize.authenticate().then(
    function() {
        console.log("Connected to workoutlog postgres datase");
    },
    function(err){
        console.log(err);
    }
);

module.exports = sequelize