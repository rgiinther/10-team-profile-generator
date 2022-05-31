//classes
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");

//remember to install npm packages 
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


//send to output folder
const OUTPUT_DIR = path.resolve(__dirname, "dist");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./dist/htmlrenderer");

// empty team array and id array
const teamMembers = [];
const idArray = [];

// initial promp question to create each employee type (manger, engineer, or intern)
function webMenu() {

  function createManager() {
      console.log("Please build your team");
      inquirer.prompt([
          {
              type: "input",
              name: "managerName",
              message: "What is your manager's name?",
              validate: answer => {
                  if (answer !== "") {
                      return true;
                  }
                  return "Please enter at least one character.";
              }
          },
          {
              type: "input",
              name: "managerId",
              message: "What is your manager's id?",
              validate: answer => {
                  const pass = answer.match(
                      /^[1-9]\d*$/
                  );
                  if (pass) {
                      return true;
                  }
                  return "Please enter a positive number greater than zero.";
              }
          },
          {
              type: "input",
              name: "managerEmail",
              message: "What is your manager's email?",
              validate: answer => {
                  const pass = answer.match(
                      /\S+@\S+\.\S+/
                  );
                  if (pass) {
                      return true;
                  }
                  return "Please enter a valid email address.";
              }
          },
          {
              type: "input",
              name: "managerOfficeNumber",
              message: "What is your manager's office number?",
              validate: answer => {
                  const pass = answer.match(
                      /^[1-9]\d*$/
                  );
                  if (pass) {
                      return true;
                  }
                  return "Please enter a positive number greater than zero.";
              }
          }
      ]).then(answers => {
          var manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
          teamMembers.push(manager);
          idArray.push(answers.managerId);
          createTeam();
      });
  }

  // Add additional team members
  function createTeam() {

    inquirer.prompt([
        {
            type: "list",
            name: "memberChoice",
            message: "Which type of team member would you like to add?",
            choices: [
                "Employee",
                "Engineer",
                "Intern",
                "I don't want to add any more team members"
            ]
        }
    ]).then(userChoice => {
        switch (userChoice.memberChoice) {
            case "Employee":
                addEmployee();
                break;
            case "Engineer":
                addEngineer();
                break;
            case "Intern":
                addIntern();
                break;
            default:
                buildTeam();
        }
    });
}
   // Create an employee
  function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "employeeName",
            message: "What is your employee's name?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter at least one character.";
            }
        },
        {
            type: "input",
            name: "employeeId",
            message: "What is your employee's id?",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass) {
                    if (idArray.includes(answer)) {
                        return "This ID is already taken. Please enter a different number.";
                    } else {
                        return true;
                    }

                }
                return "Please enter a positive number greater than zero.";
            }
        },
        {
            type: "input",
            name: "employeeEmail",
            message: "What is your employee's email?",
            validate: answer => {
                const pass = answer.match(
                    /\S+@\S+\.\S+/
                );
                if (pass) {
                    return true;
                }
                return "Please enter a valid email address.";
            }
        },
        {
            type: "input",
            name: "employeeGithub",
            message: "What is your employee's GitHub username?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter at least one character.";
            }
        }
    ]).then(answers => {
        const employee = new Employee(answers.employeeName, answers.employeeId, answers.employeeEmail, answers.employeeGithub);
        teamMembers.push(employee);
        idArray.push(answers.employeeId);
        createTeam();
    });
}
  // Create an engineer
  function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "What is your engineer's name?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter at least one character.";
            }
        },
        {
            type: "input",
            name: "engineerId",
            message: "What is your engineer's id?",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass) {
                    if (idArray.includes(answer)) {
                        return "This ID is already taken. Please enter a different number.";
                    } else {
                        return true;
                    }

                }
                return "Please enter a positive number greater than zero.";
            }
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is your engineer's email?",
            validate: answer => {
                const pass = answer.match(
                    /\S+@\S+\.\S+/
                );
                if (pass) {
                    return true;
                }
                return "Please enter a valid email address.";
            }
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "What is your engineer's GitHub username?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter at least one character.";
            }
        }
    ]).then(answers => {
        const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
        teamMembers.push(engineer);
        idArray.push(answers.engineerId);
        createTeam();
    });
}
 // Create an intern
 function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "What is your intern's name?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter at least one character.";
            }
        },
        {
            type: "input",
            name: "internId",
            message: "What is your intern's id?",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass) {
                    if (idArray.includes(answer)) {
                        return "This ID is already taken. Please enter a different number.";
                    } else {
                        return true;
                    }

                }
                return "Please enter a positive number greater than zero.";
            }
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is your intern's email?",
            validate: answer => {
                const pass = answer.match(
                    /\S+@\S+\.\S+/
                );
                if (pass) {
                    return true;
                }
                return "Please enter a valid email address.";
            }
        },
        {
            type: "input",
            name: "internSchool",
            message: "What is your intern's school?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter at least one character.";
            }
        }
    ]).then(answers => {
        const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
        teamMembers.push(intern);
        idArray.push(answers.internId);
        createTeam();
    });
}
  // Create an Html Document
  function buildTeam() {
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
}

createManager();

}

//from node assignment
function writeToFile(template) {
    fs.writeFile('index.html', template, function(err){
        if (err) {
            throw err;
       };
    
       console.log("New html file created with success!");
     });
    }

    // TODO: Create a function to initialize app
function init() {
    inquirer.prompt (questions)
    .then(answers => {
      console.log(answers)
      var readMeTemplate = generatePage (answers);
      console.log(readMeTemplate);
      writeToFile(readMeTemplate);
    })
  }
webMenu();

