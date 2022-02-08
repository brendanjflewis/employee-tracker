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
        database: process.env.DB_NAME,
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
            manager_id: answer.managerId
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



//////////////////////////////////////////////////////////
// tried promises, was unable to have any success/////////
//////////////////////////////////////////////////////////
// viewDepartments = () => {
//     const sql = `SELECT id, name AS department FROM department`;

//     connection.promise().query(sql, (err, response) => {
//         if (err) throw err;
//         console.table(response);
        
//         promptUser();
//     });
// };

// viewRoles = () => {
//     const sql = `SELECT role.id, role.title, role.salary, department.name AS department 
//                 FROM role 
//                 LEFT JOIN department ON role.department_id = department.id`;

//     connection.promise().query(sql, (err, response) => {
//         if (err) throw err;
//         console.table(response);
//         promptUser();
//     });
// };

// viewEmployees = () => {
//     const sql = `SELECT 
//                     employee.id, 
//                     employee.first_name, employee.last_name, 
//                     role.title, department.name AS department, 
//                     role.salary
//                 FROM employee
//                     LEFT JOIN role ON employee.role_id = role.id
//                     LEFT JOIN department ON role.department_id = department.id`;

//     connection.promise().query(sql, (err, response) => {
//         if (err) throw err;
//         console.table(response);
//         promptUser();
//     });
// };

// const addDepartment = () => {
//     inquirer.prompt([
//         {
//             type: 'input',
//             name: 'newDepartment',
//             message: "What is the name of the department?",
//             validate: deptName => {
//                 if (deptName) {
//                     return true
//                 } else {
//                     console.log('Please enter a name for the department!')
//                     return false;
//                 }
//             }
//         }
//     ])
//         .then(answer => {
//             const sql = `INSERT INTO department (name)
//                         VALUES (?)`;
//             connection.query(sql, answer.newDepartment, (err, response) => {
//                 if (err) throw err;
//                 console.log('Added ' + answer.newDepartment + " to departments.");

//                 viewDepartments();
//             });
//         });
// };

// const addRole = () => {
//     inquirer.prompt([
//         {
//             type: 'input',
//             name: 'role',
//             message: "What is the name of the role you want to add?",
//             validate: addRole => {
//                 if (addRole) {
//                     return true;
//                 } else {
//                     console.log('Please enter a role!');
//                     return false;
//                 }
//             }
//         },
//         {
//             type: 'number',
//             name: 'salary',
//             message: "Enter the salary of this role.",
//             validate: addSalary => {
//                 if (addSalary) {
//                     return true;
//                 } else {
//                     console.log('Please enter the salary of this role!');
//                     return false;
//                 }
//             }
//         },
//     ])
//         .then(answer => {
//             const params = [answer.role];
//             const roleSql = `SELECT name, id FROM department`;
//             connection.promise().query(roleSql, (err,data) => {
//                 if (err) throw err;
//                 const dept = data.map(({ name, id }) => ({ name: name, value: id}));
//                 inquirer.prompt([
//                     {
//                         name: 'list',
//                         name: 'dept',
//                         message: "What department does this role belong to?",
//                         choices: dept
//                     }
//                 ])
//                     .then(deptChoice => {
//                         const dept = deptChoice.dept;
//                         params.push(dept);

//                         const sql = `INSERT INTO role (title, salary, department_id)
//                                     VALUES (?, ?, ?)`;
//                         connection.query(sql, params, (err, response) => {
//                             if (err) throw err;
//                             console.log('Added' + answer.role + " to roles!");

//                             viewRoles();
//                         });
//                     });
//             });
//         });
// };

// const addEmployee = () => {
//     inquirer.prompt([
//         {
//             type: 'input',
//             name: 'firsName'
//         }
//     ])
// }

// const updateEmployeeRole = 