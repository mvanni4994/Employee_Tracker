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

function viewEmp() {
    var query =
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary,";
    query +=
      "department.department, employee.manager_id FROM employee LEFT JOIN role ON (employee.role_id = role.id)";
    query += "LEFT JOIN department ON (role.department_id = department.id)";
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
    });
  }
  
  function viewRoleChoices() {
    var query = "SELECT id, name FROM role";
    connection.query(query, function (err, res) {
      if (err) rej(err);
      const roleRes = res;
      const roleArr = [];
      for (let i = 0; i < roleRes.length; i++) {
        roleArr.push({
          name: roleRes[i].name,
          value: roleRes[i].id,
          short: roleRes[i].id,
        });
      }
    });
    return roleArr;
  }
  
  function viewManagerChoices() {
    return new Promise((res, rej) => {
      var query =
        "SELECT employee.id, employee.first_name, employee.last_name FROM employee;";
      connection.query(query, function (err, res) {
        if (err) rej(err);
        const manageRes = res;
        const managerArr = [];
        for (let i = 0; i < manageRes.length; i++) {
          managerArr.push({
            name: manageRes[i].first_name + " " + manageRes[i].last_name,
            value: manageRes[i].id,
            short: manageRes[i].id,
          });
        }
      });
      res(managerArr);
    });
  }
  
  async function viewDeptChoices() {
    var query = "SELECT * FROM department";
   const choiceList = await connection.query(query, function (err, res) {
      if (err) throw err;
      const deptRes = res;
      const deptArr = deptRes.map((obj) => {
        return {
          name: obj.department,
          value: obj.id,
          short: obj.id,
        };
      });
      return deptArr;
    });
    return choiceList
  }
  

function execDB() {
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
            connection.end();
        }
    })
}
