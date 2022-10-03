// Gives us access to fs module methods
const fs = require('fs');
// Includes generate page function from other file 
const generatePage = require('./src/page-template.js');

const profileDataArgs = process.argv.slice(2);

const [name, github] = profileDataArgs;

// Generating the File
fs.writeFile('index.html', generatePage(name, github), err => {
    if (err) throw err;

    console.log('Portfolio Complete! Checkout index.html to see the output!');
});