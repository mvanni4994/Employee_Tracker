const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const figlet = require("figlet");
require("dotenv").config();

const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const figlet = require("figlet");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Tstai410.",
  database: "employeeDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log(`Database connection online at port 3306`);
  figlet("Employee_Tracker", function (err, data) {
    if (err) throw err;
    execDB();
  });
});

var roles = []
var managers = []
var departments = []


function askUser() {
    inquirer
    .prompt([
        {
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "Add department",
            "Add role",
            "Add employee",
            "Update employee role",
            "View information",
            "Delete information",
            "Exit"
        ]
        }

    ]).then(function(answer) {
        switch (answer.action) {
        
            case "Add employee":
                addEmployee();
            break;
            case "Add department":
                addDepartment();
            break;
            case "Add role":
                addRole();
            break;
            case "Update employee role":
                userUpdate();
            break;
            case "View information":
                userView();
            break;
            case "Delete information":
                userDelete();
            break;
            case "Exit":
                process.exit();
            break;
        }
    })
}