"use strict";

async function loadInquirer() {
  const inquirer = await import("inquirer");
  return inquirer.default;
}

exports.prompter = async function (cz, commit) {
  const inquirer = await loadInquirer();

  const types = [
    { name: "feat", description: "A new feature" },
    { name: "fix", description: "A bug fix" },
    { name: "ui", description: "Work on the user interface" },
    { name: "logic", description: "Work on core logic" },
    {
      name: "refactor",
      description: "A code change that neither fixes a bug nor adds a feature",
    },
    {
      name: "chore",
      description: "Changes to the build process or auxiliary tools",
    },
    { name: "docs", description: "Documentation only changes" },
    { name: "WiP", description: "Still working on this" },
    {name: "stash", description: "Not ready to commit, still committing anyways 🤡"},
  ];

  // Calculate the maximum length of the type strings
  const maxTypeLength = Math.max(...types.map((type) => type.name.length));

  const questions = [
    {
      type: "list",
      name: "type",
      message: "Select the type of change you are committing:",
      choices: types.map((type) => ({
        name: `${type.name.padEnd(maxTypeLength)}  ${type.description}`,
        value: type.name,
      })),
      default: "feat",
    },
    {
      type: "input",
      name: "subject",
      message: "Write a short, descriptive commit message:",
      validate: (input) => !!input.trim() || "Commit message cannot be empty",
    },
  ];

  const answers = await inquirer.prompt(questions);

  let commitMessage = `${answers.type}: ${answers.subject}`;

  commit(commitMessage);
};
