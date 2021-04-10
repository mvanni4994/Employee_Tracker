const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util')
const mysql = require('mysql');
const cTable = require('console.table');

const roleArray = [];
const managerArray = [];


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Tstai410.",
    database: "employee_trackerDB"

});

const PORT = process.env.PORT || 8080;

connection.connect(function(err){
    if (err) throw err;
    startApp();
})
