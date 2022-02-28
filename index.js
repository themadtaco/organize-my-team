const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');

const initialPrompt = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'answer',
            message: 'Hello! What would you like to do?',
            choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an existing employee role']
        }
    ])
    .then(({ answer }) => {
        if (answer === 'View all Departments') {
            viewDepartments();
        } else if(answer === 'View all Roles') {
            viewRoles();
        } else if(answer === 'View all Employees') {
            viewEmployees();
        } else if(answer === 'Add a department') {
            addDepartment();
        } else if(answer === 'Add a role') {
            addRole();
        } else if(answer === 'Add an employee') {
            addEmployee();
        } else if(answer === 'Update an existing employee role') {
            updateRole();
        } else {
            return;
        }
    });
};

// view all departments
const viewDepartments = () => {
    const sql = `SELECT * FROM department;`

    db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
            return;
        } else{
            console.log(console.table(res));
            initialPrompt();
        }
    })
};

// view all roles
const viewRoles = () => {
    const sql = `SELECT role.*, department.name
                AS department_name
                FROM role
                LEFT JOIN department
                ON role.department_id = department.id;`

    db.query(sql, (err, res) => {
        if(err) {
            console.log(err);
            return;
        } else{
            console.log(console.table(res));
            initialPrompt();
        }
    });
};

// view all employees
const viewEmployees = () => {
    const sql =  `SELECT employee.id, employee.first_name, employee.last_name, role.title AS Job, role.salary, department.name AS department
                FROM employee
                INNER JOIN role
                ON employee.role_id = role.id
                INNER JOIN department
                ON role.department_id = department.id`;

    db.query(sql, (err, res) => {
        if(err) {
            console.log(err);
            return;
        } else{
            console.log(console.table(res));
            initialPrompt();
        }
    })
};

// add a new department
const addDepartment = () => {
    return inquirer.prompt([
        {
            type:'input',
            name:'name',
            message: 'What is the name of the department?'
        }
    ])
    .then(depName => {
        const sql = `INSERT INTO department (name) VALUES (?)`;
        const params = [depName.name];
        db.query(sql, params, (err, res) => {
            if(err) {
                console.log(err);
                return;
            } else{
                console.log(`${depName.name} added!`);
                initialPrompt();
            }
        })
    })
};

// add a new role row to role table
const addRole = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the new Role name?'
        },
        {
            type: 'input',
            name: 'salary',
            message: "What is the new Role's salary?"
        },
        {
            type: 'list',
            name: 'department',
            message: 'What department does the new role belong to?',
            choices: ['Developers', 'Management', 'Service']
        }
    ])
    .then(roleData => {
        if (roleData.department === 'Developers') {
            roleData.department = 1;
        } else if (roleData.department === 'Management') {
            roleData.department = 2;
        } else {
            roleData.department = 3;
        }
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
        const params = [roleData.name, roleData.salary, roleData.department];
        db.query(sql, params, (err, res) => {
            if(err) {
                console.log(err);
                return;
            } else {
                console.log(`${roleData.name} role added!`);
                initialPrompt();
            }
        });
    });
};

// add an employee to employee table
const addEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?"
        },
        {
            type: 'list',
            name: 'role',
            message: "What is your employee's role?",
            choices: ['Manager', 'Janitor', 'Customer Service', 'Jr Developer','Sr Developer']
        },
        {
            type: 'list',
            name: 'manager',
            message: "Who is your employee's manager?",
            choices: ['Jon Snow', 'Doctor Strange', 'The Hound']
        }
    ])
    .then(eData => {
        // if statement for Manager options
        if (eData.manager === 'Jon Snow') {
            eData.manager = 2;
        } else if(eData.manager === 'Doctor Strange') {
            eData.manager = 3;
        } else{
            eData.manager = 7;
        }
        // if statement for Role choices
        if (eData.role === 'Manager') {
            eData.role = 1;
        } else if (eData.role === 'Janitor') {
            eData.role = 2;
        }else if (eData.role === 'Customer Service') {
            eData.role = 3;
        }else if (eData.role === 'Jr Developer') {
            eData.role = 4;
        } else {
            eData.role = 5;
        }
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        const params = [eData.firstName, eData.lastName, eData.role, eData.manager];
        db.query(sql, params, (err, res) => {
            if(err) {
                console.log(err);
                return;
            } else{
                console.log(`${eData.firstName} ${eData.lastName} added!`);
                initialPrompt();
            }
        })
    })
};

// update an existing employee role
const updateRole = () => {

};

// connect to the database
db.connect(err => {
    if (err) throw err;
    console.log('Connected!');
    initialPrompt();
});