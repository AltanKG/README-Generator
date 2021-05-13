// Accessing the modules
const fs = require("fs");
const inquirer = require("inquirer");

// Grabs user input
inquirer
  .prompt([
    {
      type: "input",
      message: "Enter your Github username: ",
      name: "github",
    },
    {
      type: "input",
      message: "Enter your email: ",
      name: "email",
    },
    {
      type: "input",
      message: "Enter your project title: ",
      name: "title",
    },
    {
      type: "input",
      message: "Enter your project decsription: ",
      name: "description",
    },
    {
      type: "input",
      message: "Enter the command to install necessary dependencies: ",
      name: "installation",
    },
    {
      type: "input",
      message: "Enter your usage information: ",
      name: "usage",
    },
    {
      type: "input",
      message: "Enter your contribution guidelines: ",
      name: "contribution",
    },
    {
      type: "input",
      message: "Enter the test commands: ",
      name: "test",
    },
    {
      type: "list",
      choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"],
      message: "Select your license",
      name: "license",
    },
  ])
  // Writes user input into the README.md file
  .then((response) => {
    fs.writeFile("README.md", makeREADME(response), (error) =>
      error
        ? console.log("error")
        : console.log("You have successfully entered your information!")
    );
  });

// Makes a README file dynamically based off of user input
const makeREADME = (response) => {
  // Based off of user input selects the badge to be displayed in README file
  const badgeSelect = () => {
    switch (response.license) {
      case "MIT":
        var badgeString =
          "![License](https://img.shields.io/badge/license-MIT-blue.svg)";
        return badgeString;

      case "APACHE 2.0":
        badgeString =
          "![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)";
        return badgeString;

      case "GPL 3.0":
        badgeString =
          "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
        return badgeString;

      case "BSD 3":
        badgeString =
          "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)";
        return badgeString;

      case "None":
        badgeString = "License: None";
        return badgeString;

      default:
        console.log("Select a badge");
    }
    return badgeString;
  };

  // Creates a string README template to write into the README.md file
  let stringREADME = `
# ${response.title}
${badgeSelect()}

## Description

${response.description}

## Table of Contents

* [Installation](#installation)

* [Usage](#usage)

* [License](#license)

* [Contributing](#contributing)

* [Tests](#tests)

* [Questions](#questions)

## Installation

To install necessary dependencies, run the following command:

${response.installation}

## Usage

${response.usage}

## License

The license used for this application is ${response.license} license.

## Contributing

${response.contribution}

## Tests

To run tests, run the following command:

${response.test}

## Questions
    
Here is a link to my Github profile: ${response.github}

Contact me by email here: ${response.email}
`;

  return stringREADME;
};
