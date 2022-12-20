const fs = require("fs");
const inquirer = require("inquirer");

// Array to store the employee objects
const employees = [];

// Prompt the user for information about each employee
function promptUser() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the employee name:",
      },
      {
        type: "input",
        name: "title",
        message: "Enter the employee title:",
      },
      {
        type: "input",
        name: "email",
        message: "Enter the employee email:",
      },
    ])
    .then((answers) => {
      // Create an employee object with the user's input
      const employee = {
        name: answers.name,
        title: answers.title,
        email: answers.email,
      };
      // Add the employee object to the employees array
      employees.push(employee);
      // Ask the user if they want to add another employee
      return inquirer
        .prompt([
          {
            type: "confirm",
            name: "addAnother",
            message: "Do you want to add another employee?",
          },
        ])
        .then((answer) => {
          if (answer.addAnother) {
            // If the user wants to add another employee, prompt them again
            return promptUser();
          }
          // If the user doesn't want to add another employee, generate the HTML webpage
          generateHTML();
        });
    });
}

// Generate the HTML webpage that displays the employee summaries
function generateHTML() {
  // Create the HTML template
  let html = `
  <html>
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Software Engineering Team</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
  </head>
  <body>
  <div class="card>
    <h1>Software Engineering Team</h1>
    <ul class="list-group list-group-flush">
  `;
  // Iterate through the employees array and add a list item for each employee
  for (const employee of employees) {
    html += `
      <li class="list-group-item">
        <h2 class="card-header">${employee.name}</h2>
        <p>${employee.title}</p>
        <p>${employee.email}</p>
      </li>
    `;
  }
  html += `
    </ul>
    </div>
  </body>
  </html>
  `;
  // Write the generated HTML to a file
  fs.writeFileSync("team.html", html);
  console.log("HTML file generated successfully!");
}

// Start the application by prompting the user for the first employee
promptUser();
