const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const teamMembers = [];

const inquirer = require("inquirer");

function createManager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the team manager's name?",
        // Adds validation logic for name
        validate: function (input) {
          return input !== "" ? true : "Name cannot be empty.";
        },
      },
      {
        type: "input",
        name: "id",
        message: "What is the team manager's employee ID?",
        validate: function (input) {
          // Adds validation logic for employee ID
          return input.match(/^\d+$/)
            ? true
            : "Please enter a valid employee ID.";
        },
      },
      {
        type: "input",
        name: "email",
        message: "What is the team manager's email?",
        validate: function (input) {
          // Adds validation logic for email
          return input.includes("@")
            ? true
            : "Please enter a valid email address.";
        },
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is the team manager's office number?",
        validate: function (input) {
          // Adds validation logic for office number
          return input.match(/^\d+$/)
            ? true
            : "Please enter a valid office number.";
        },
      },
    ])
    .then((answers) => {
      const manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      teamMembers.push(manager);
      createTeam();
    });
}

function createTeam() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "Add an engineer",
          "Add an intern",
          "Finish building the team",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.choice) {
        case "Add an engineer":
          createEngineer();
          break;
        case "Add an intern":
          createIntern();
          break;
        case "Finish building the team":
          finishBuildingTeam();
          break;
      }
    });
}

function createEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the engineer's name?",
        validate: function (input) {
          return input !== "" ? true : "Engineer's name cannot be empty.";
        },
      },
      {
        type: "input",
        name: "id",
        message: "What is the engineer's employee ID?",
        validate: function (input) {
          // Adds validation logic for employee ID (checks that the input it one or more digits)
          return input.match(/^\d+$/)
            ? true
            : "Please enter a valid employee ID.";
        },
      },
      {
        type: "input",
        name: "email",
        message: "What is the engineer's email?",
        validate: function (input) {
          // Adds validation logic for email
          return input.includes("@")
            ? true
            : "Please enter a valid email address.";
        },
      },
      {
        type: "input",
        name: "github",
        message: "What is the engineer's GitHub username?",
        validate: function (input) {
          // Adds validation logic for GitHub username
          return input !== "" ? true : "GitHub username cannot be empty.";
        },
      },
    ])
    .then((answers) => {
      const engineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      teamMembers.push(engineer);
      createTeam();
    });
}

function createIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the intern's name?",
        validate: function (input) {
          return input !== "" ? true : "Intern's name cannot be empty.";
        },
      },
      {
        type: "input",
        name: "id",
        message: "What is the intern's employee ID?",
        validate: function (input) {
          // Adds validation logic for employee ID (checks that the input it one or more digits)
          return input.match(/^\d+$/)
            ? true
            : "Please enter a valid employee ID.";
        },
      },
      {
        type: "input",
        name: "email",
        message: "What is the intern's email?",
        validate: function (input) {
          // Adds validation logic for email
          return input.includes("@")
            ? true
            : "Please enter a valid email address.";
        },
      },
      {
        type: "input",
        name: "school",
        message: "What is  the intern's school?",
        validate: function (input) {
          return input !== "" ? true : "Intern's school cannot be empty.";
        },
      },
    ])
    .then((answers) => {
      const intern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      teamMembers.push(intern);
      createTeam();
    });
}

function finishBuildingTeam() {
  const html = render(teamMembers);

  // Ensures the output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  // Write the HTML to the file using fs
  fs.writeFileSync(outputPath, html);

  console.log(`Team HTML has been generated and saved to: ${outputPath}`);
}

// Start the application by creating the team manager
createManager();
