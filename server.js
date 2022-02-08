const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

require('dotenv').config()

const connection = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PW,
        database: process.env.DB_NAME,
    }
);

connection.connect((error) => {
    if (error) throw error;
    console.log(`
||||||||||||||||||||||||||||||||||||||||    
||||| Welcome to employee tracker! |||||
░░░░░░░░░░░░░░░░░░░░░░█████████░░░░░░░░░
░░███████░░░░░░░░░░███▒▒▒▒▒▒▒▒███░░░░░░░
░░█▒▒▒▒▒▒█░░░░░░░███▒▒▒▒▒▒▒▒▒▒▒▒▒███░░░░
░░░█▒▒▒▒▒▒█░░░░██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██░░
░░░░█▒▒▒▒▒█░░░██▒▒▒▒▒██▒▒▒▒▒▒██▒▒▒▒▒███░
░░░░░█▒▒▒█░░░█▒▒▒▒▒▒████▒▒▒▒████▒▒▒▒▒▒██
░░░█████████████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██
░░░█▒▒▒▒▒▒▒▒▒▒▒▒█▒▒▒▒▒▒▒▒▒█▒▒▒▒▒▒▒▒▒▒▒██
░██▒▒▒▒▒▒▒▒▒▒▒▒▒█▒▒▒██▒▒▒▒▒▒▒▒▒▒██▒▒▒▒██
██▒▒▒███████████▒▒▒▒▒██▒▒▒▒▒▒▒▒██▒▒▒▒▒██
█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█▒▒▒▒▒▒████████▒▒▒▒▒▒▒██
██▒▒▒▒▒▒▒▒▒▒▒▒▒▒█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██░
░█▒▒▒███████████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██░░░
░██▒▒▒▒▒▒▒▒▒▒████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█░░░░░
░░████████████░░░█████████████████░░░░░░
||||||||||||||||||||||||||||||||||||||||
||||||||||||||||||||||||||||||||||||||||`);
    promptUser();
});

const promptUser = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Leave Employee Tracker'
            ],
        },
    ])
        .then((answers) => {
            const { choices } = answers;

            if (choices === 'View all departments') {
                viewDepartments();
            }
            if (choices === 'View all roles') {
                viewRoles();
            }
            if (choices === 'View all employees') {
                viewEmployees();
            }
            if (choices === 'Add a department') {
                addDepartment();
            }
            if (choices === 'Add a role') {
                addRole();
            }
            if (choices === 'Add an employee') {
                addEmployee();
            }
            if (choices === 'Update an employee role') {
                updateEmployeeRole();
            }
            if (choices === "Leave Employee Tracker") {
                connection.end()
            };
        });
};

// function to view all departments
function viewDepartments() {
    connection.query("SELECT * FROM department;", (err, res) => {
        if (err) throw err;
        console.table(res)
        promptUser()
    })
}

// function to view all roles
function viewRoles() {
    connection.query("SELECT * FROM role;", (err, res) => {
        if (err) throw err;
        console.table(res)
        promptUser()
    })
}

// function to view all roles
function viewEmployees() {
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
        console.table(res)
        promptUser()
    })
}

// function to add a new department
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the new department?'
        }
    ]).then(answer => {
        connection.query("INSERT INTO department SET ?;",
            {
                name: answer.department
            }
        )
        console.log('New department added!');
        promptUser()
    })
}

// function to add a new role
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'roleTitle',
            message: 'What is the title of this role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this role?'
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'What is the department ID for this role?'
        }
    ]).then(answer => {
        connection.query("INSERT INTO role SET ?;",
        {
            title: answer.roleTitle,
            salary: answer.salary,
            department_id: answer.departmentId
        }
        )
        console.log('New role added!');
        promptUser()
    })
}

// function to add a new employee
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the employees first name?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the empoyees last name?'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'What is the role id of the employees role?'
        }   
    ]).then(answer => {
        connection.query("INSERT INTO employee SET ?;",
        {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.roleId,
        }
        )
        console.log('New employee added!');
        promptUser()
    })
}

// function to update an employee's role
function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee',
            message: 'What is the ID number of the employee you want to update?'
        },
        {
            type: 'input',
            name: 'role',
            message: 'What is the ID number of the role?'
        }
    ]).then(answer => {
        connection.query("UPDATE employee SET ? WHERE ?",
            [
                {
                    role_id: answer.role
                },
                {
                    id: answer.employee
                }
            ]
        )
        console.log('Updated employee role!');
        promptUser()
    })
}