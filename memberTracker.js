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

