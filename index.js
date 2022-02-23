const inquirer = require('inquirer');
const db = require('./db/connection');


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
            viewDepartments();
        } else if(answer === 'Add a role') {
            addRole();
        } else if(answer === 'Add an employee') {
            addEmployee();
        } else if(answer === 'Update an existing employee role') {
            updateRole();
        }
    });
};

const viewDepartments = () => {
    // view department table
};

const viewRoles = () => {
    // view role table
};

const viewEmployees = () => {
    // view employee table
};

const addDepartment = () => {
    // add a new row to department table
};

// add a new role row to role table
const addRole = () => {

};

// add an employee to employee table
const addEmployee = () => {

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