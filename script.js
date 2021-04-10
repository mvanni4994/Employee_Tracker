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

function userDelete() {
    inquirer
    .prompt([
        {
        name: "view",
        type: "rawlist",
        message: "What information would you like to delete?",
        choices: [
            "Employees",
            "Departments",
            "Roles"
        ]
        }
    ]).then(function(answer) {
        switch (answer.view) {
            case "Employees":
                deleteEmployee()
            break;
            case "Departments":
                deleteDepartments()
            break;
            case "Roles":
                deleteRoles()
            break;
        }
    })
}

function deleteEmployee() {
    connection.query("SELECT employee.last_name FROM employee", function(err, answer) {
         if (err) throw err;
    inquirer
    .prompt([
    {
        name: "employee",
        type: "rawlist",
        message: "Choose employee to delete.",
        choices: function() {
            var lastName = [];
            for (var i = 0; i < answer.length; i++) {
              lastName.push(answer[i].last_name);
            }
            return lastName;
          },
    },
    ]).then(function(response) {
        connection.query(
        "DELETE FROM employee WHERE ?",
        {
            last_name: response.employee
        },
        function(err) {
            if (err) throw err;
            console.table(response);
            console.log("You successfully deleted an employee");
            askUser()
        })
        })
    })
}

function deleteDepartments() {
    connection.query("SELECT name FROM department", function(err, answer) {
         if (err) throw err;
    inquirer
    .prompt([
    {
        name: "department",
        type: "rawlist",
        message: "Choose department to delete.",
        choices: function() {
            var department = [];
            for (var i = 0; i < answer.length; i++) {
              department.push(answer[i].name);
            }
            return department;
        },
    },
    ]).then(function(response) {
    connection.query(
        "DELETE FROM department WHERE ?",
        {
            name: response.department
        },
        function(err) {
            if (err) throw err;
            console.table(response);
            console.log("You successfully deleted a department");
            askUser()
        })
    })
    })
}

function deleteRoles() {
    connection.query("SELECT role.title FROM role", function(err, answer) {
         if (err) throw err;
    inquirer
    .prompt([
    {
        name: "role",
        type: "rawlist",
        message: "Choose role to delete.",
        choices: function() {
            var role = [];
            for (var i = 0; i < answer.length; i++) {
              role.push(answer[i].title);
            }
            return role;
        },
    },
    ]).then(function(response) {
    connection.query(
        "DELETE FROM role WHERE ?",
        {
            title: response.role
        },
        function(err) {
            if (err) throw err;
            console.table(response);
            console.log("You successfully deleted a role");
            askUser()
        })
    })
    })
}