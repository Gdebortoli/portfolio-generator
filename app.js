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
            message: 'What is your name? *Required*',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username *Required*',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter your Github Username!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
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
            name: 'projectname',
            message: 'What is the name of your project? *Required*',
            validate: projectnameInput => {
                if (projectnameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project *Required*',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log('Please provide a description of your project!');
                    return false;
                }
            }
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
            message: 'Enter the Github link to your project. *Required*',
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log('Please enter your Github Link!');
                    return false;
                }
            }
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