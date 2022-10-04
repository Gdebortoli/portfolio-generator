// // Gives us access to fs module methods
// const fs = require('fs');
// Inquirer
const inquirer = require('inquirer');
// // Includes generate page function from other file 
// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(name, github);

// // Generating the File
// fs.writeFile('index.html', pageHTML, err => {
//     if (err) throw err;

//     console.log('Portfolio Complete! Checkout index.html to see the output!');
// });

// User Questions
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username'
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:'
        }
    ]);
};

// Project Questions
const promptProject = portfolioData => {

    console.log(`
    =================
    Add a New Project
    =================
    `);
    // If there's no 'projects' array property, create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    // Inquirer Prompr for Project Q's 
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)'
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)'
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }

    ])
        .then(projectData => {
            portfolioData.projects.push(projectData);
            // evaluate user response and whether they want to add more projects
            if (projectData.confirmAddProject) {
                return promptProject(portfolioData);
            } else {
            // if they choose not to add more portfolio data it will return false and stop retrieving data   
                return portfolioData;
            }
        });
    ;

};

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
      });