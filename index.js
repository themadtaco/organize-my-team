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
    const sql =  `SELECT employee.*, role.*
                FROM employee
                INNER JOIN role
                ON employee.role_id = role.id;`;
                // unfinished keep reading to join all neccessary columns 

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
        }
    ])
    .then(roleData => {
        const sql = `INSERT INTO role (title, salary) VALUES (?, ?)`;
        const params = [roleData.name, roleData.salary];
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
        }
    ])
    .then(eData => {
        const sql = `INSERT INTO employee (first_name, last_name) VALUES (?, ?)`;
        const params = [eData.firstName, eData.lastName];
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