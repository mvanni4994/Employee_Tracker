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

async function addEmployee(){
    var getTitles = await getRoles();
    var managerNames = await chooseManager();
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the first name of the member?',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the last name of the member?',
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the members role?',
            choices: getTitles
        },
        {
            type: 'list',
            name: 'managerChoice',
            message: 'Who is their guild manager?',
            choices: managerNames
        },
    ]).then(async function(res){
        console.log(res.firstName, res.lastName, res.role, res.managerChoice);
        var roleID = await new Promise(function(resolve, reject){
            connection.query("SELECT * FROM title_role WHERE title = ?", [res.role], function(err, res){
            if (err) reject(err);
            resolve(res[0].id);
        })
    })
        var managerID = await new Promise(function(resolve, reject){
            connection.query("SELECT * FROM employee WHERE first_name = ?", [res.managerChoice], function(err, res){
            if (err) reject(err);
            resolve(res[0].id);
        })
    })
        connection.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("${res.firstName}", "${res.lastName}", "${roleID}", "${managerID}")`,
        async function(err, res){
            if (err) throw err;
            var allEmployees = await getEmployees();
            console.table(allEmployees);
            startApp();
        })
    })
}    

function getRoles(){
    return new Promise(function(resolve, reject){
        var titles = []
        connection.query("SELECT title FROM title_role", function(err, res){
            if(err) reject(err);
            for (let i = 0; i < res.length; i++){
                titles.push(res[i].title)
            } 
            resolve(titles);
        })
    })
}

function getEmployees(){
    return new Promise(function (resolve, reject){
        connection.query("SELECT * FROM employee", function(err, res){
            if(err) reject(err);
            resolve(res);
        })
    })
}

function addRole(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the member?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the member?',
        },
    ]).then(function(res){
    })
}

function addDepartment(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'dep_name',
            message: 'What is the name of the guild?',
        },
    ]).then(function(res){
        connection.query("INSERT INTO department SET ?",
            { name: res.dep_name }, 
            function(err){
                if (err) throw err
                console.table(res)
                startApp();
            })
    })
}

function quit(){
    connection.end()
}

app.listen(PORT, () =>
  console.log(`Server listening on: http://localhost:${PORT}`)
)