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


getRoles();



async function startApp(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: [
                "View All Members",
                "View Members By Guild",
                "View Members By Role",
                "Update Member",
                "Add Member",
                "Add Role",
                "Add Guild",
                "Quit",
            ]
        }
    ]).then(function(res){
            switch (res.options){
                case "View All Members":
                    allEmployees();
                break; 

                case "View Members by Guild":
                    employeeDepartment();
                break;

                case "View Members By Role":
                    employeeRole();
                break;

                case "Update Member":
                    updateEmployee();
                break;

                case "Add Member":
                    addEmployee();
                break;

                case "Add Role":
                    addRole();
                break;

                case "Add Guild":
                    addDepartment();
                break;

                default:
                    quit();
            }
        })
}


function allEmployees(){
    console.log("working?")
    return new Promise(function (resolve, reject){
        connection.query("SELECT employee.first_name, employee.last_name FROM employee", function(err, res){
            if(err) reject(err);
            resolve(res);
        })
    })
}



function employeeDepartment(){
    connection.query,
    function(err, res){
        if (err) throw err
        console.table(res)
        startApp();
    }
}

function employeeRole(){
    connection.query,
    function(err, res){
        if (err) throw err
        console.table(res)
        startApp();
    }
}

function updateEmployee(){
    connection.query,
    function(err, res){
        if (err) throw err
        console.table(res)
        startApp();
    }
}


function chooseRole(){
    connection.query("SELECT * FROM role", function(err, res){
        if (err) throw err;
        for (var i=0; i < res.length; i++){
            roleArray.push(res[i].role)
        }
    })
} return roleArray;

function chooseManager(){
    return new Promise(function(resolve, reject){
        connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res){
            if (err) throw err;
            for (var i=0; i < res.length; i++){
                managerArray.push(res[i].first_name)
            }
            resolve(managerArray)
        })
    })  
}
