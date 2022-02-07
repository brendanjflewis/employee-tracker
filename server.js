const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

// const connection = require('./db/connection');

require('dotenv').config()

const connection = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PW,
        database: process.env.DB_DATABASE,
    }
);

// db.connect(err => {
//     if (err) {
//         console.log(err);
//     }
//     promptUser();
// });

// connection.connect((error) => {
//     if (error) throw error;
//     promptUser();
// });

connection.connect((error) => {
    if (error) throw error;
    console.log(`Welcome to employee tracker!`);
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
            if (choices === 'Add a roll') {
                addRole();
            }
            if (choices === 'Add an employee') {
                addEmployee();
            }
            if (choices === 'Update an employee role') {
                updateEmployeeRole();
            }
            if (choices === "Leave Employee Tracker") {
                db.end()
            };
        });
};

viewDepartments = () => {
    const sql = `SELECT id, name AS department FROM department`;

    connection.promise().query(sql, (err, response) => {
        if (err) throw err;
        console.table(response);
        
        promptUser();
    });
};

viewRoles = () => {
    const sql = `SELECT role.id, role.title, role.salary, department.name AS department 
                FROM role 
                LEFT JOIN department ON role.department_id = department.id`;

    connection.promise().query(sql, (err, response) => {
        if (err) throw err;
        console.table(response);
        promptUser();
    });
};

viewEmployees = () => {
    const sql = `SELECT 
                    employee.id, 
                    employee.first_name, employee.last_name, 
                    role.title, department.name AS department, 
                    role.salary
                FROM employee
                    LEFT JOIN role ON employee.role_id = role.id
                    LEFT JOIN department ON role.department_id = department.id`;

    connection.promise().query(sql, (err, response) => {
        if (err) throw err;
        console.table(response);
        promptUser();
    });
};

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: "What is the name of the department?",
            validate: deptName => {
                if (deptName) {
                    return true
                } else {
                    console.log('Please enter a name for the department!')
                    return false;
                }
            }
        }
    ])
        .then(answer => {
            const sql = `INSERT INTO department (name)
                        VALUES (?)`;
            connection.query(sql, answer.newDepartment, (err, response) => {
                if (err) throw err;
                console.log('Added ' + answer.newDepartment + " to departments.");

                viewDepartments();
            });
        });
};

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: "What is the name of the role you want to add?",
            validate: addRole => {
                if (addRole) {
                    return true;
                } else {
                    console.log('Please enter a role!');
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'salary',
            message: "Enter the salary of this role.",
            validate: addSalary => {
                if (addSalary) {
                    return true;
                } else {
                    console.log('Please enter the salary of this role!');
                    return false;
                }
            }
        },
        // {
        //     type: 'input',
        //     name: 'salary',
        //     message: "What is the salary of this role",
        //     validate: addSalary => {
        //         if (addSalary) {
        //             return true;
        //         } else {
        //             console.log('Please enter the salary of this role!');
        //             return false;
        //         }
        //     }
        // },
    ])
        .then(answer => {
            const params = [answer.role];
            const roleSql = `SELECT name, id FROM department`;
            connection.promise().query(roleSql, (err,data) => {
                if (err) throw err;
                const dept = data.map(({ name, id }) => ({ name: name, value: id}));
                inquirer.prompt([
                    {
                        name: 'list',
                        name: 'dept',
                        message: "What department does this role belong to?",
                        choices: dept
                    }
                ])
                    .then(deptChoice => {
                        const dept = deptChoice.dept;
                        params.push(dept);

                        const sql = `INSERT INTO role (title, salary, department_id)
                                    VALUES (?, ?, ?)`;
                        connection.query(sql, params, (err, response) => {
                            if (err) throw err;
                            console.log('Added' + answer.role + " to roles!");

                            viewRoles();
                        });
                    });
            });
        });
};

// const addEmployee = 

// const updateEmployeeRole