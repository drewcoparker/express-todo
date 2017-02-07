var express = require('express');
var router = express.Router();
var config = require('../config/config.js')
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : config.host,
    user     : config.username,
    password : config.password,
    database : config.database
});

// After this line runs, we are connected to mySql
connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
    // var taskArray = [];
    var selectQuery = "SELECT * FROM tasks";
    connection.query(selectQuery, (error, results, field) => {
        res.render('index', { taskArray: results });
        // res.json(results);
    })
});

// Post todo
router.post('/addNew', (req, res, next) => {
    var newTask = req.body.newTaskString;
    var taskDate = req.body.newTaskDeadline;
    var insertQuery = `INSERT INTO tasks (task_name, task_date) VALUES ("${newTask}", "${taskDate}")`;
    connection.query(insertQuery, (error, results, field) => {
        if (error) throw error;
        res.redirect('/');
    })
});


// Edit Get //
router.get('/edit/:id', (req, res, next) => {
    var selectQuery = `SELECT * FROM tasks WHERE id=${req.params.id}`;
    connection.query(selectQuery, (error, results, fields) => {
        var days = results[0].task_date.getDate();
        if (days < 10) {
            days = "0" + days;
        }
        var months = results[0].task_date.getMonth() + 1;
        if (months < 10) {
            months = "0" + months;
        }
        var years = results[0].task_date.getFullYear();
        var mysqlDate = `${years}-${months}-${days}`;
        results[0].task_date = mysqlDate;
        res.render('edit', { task: results[0] });
    })
});


// Edit Post //
router.post('/edit/:id', (req, res, next) => {
    var id = req.params.id
    var newTask = req.body.newTaskString;
    var taskDate = req.body.newTaskDeadline;
    var updateQuery = `UPDATE tasks SET task_name="${newTask}", task_date="${taskDate}" WHERE ID=${id}`;

    res.send(updateQuery);
});


// Delete Get //
router.get('/delete/:id', (req, res, next) => {
    res.send(req.params.id);
});


// Delete Post //
router.post('/delete/:id', (req, res, next) => {
    res.send(req.params.id);
});

module.exports = router;
