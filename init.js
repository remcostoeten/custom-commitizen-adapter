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
    { name: "docs", description: "Documentation only changes" },
    { name: "style", description: "Changes that do not affect the meaning of the code" },
    { name: "refactor", description: "A code change that neither fixes a bug nor adds a feature" },
    { name: "test", description: "Adding missing tests or correcting existing tests" },
    { name: "chore", description: "Changes to the build process or auxiliary tools" },
  ];

  // Calculate the maximum length of the type strings
  const maxTypeLength = Math.max(...types.map(type => type.name.length));

  const questions = [
    {
      type: "list",
      name: "type",
      message: "Select the type of change you are committing:",
      choices: types.map(type => ({
        name: `${type.name.padEnd(maxTypeLength)}  ${type.description}`,
        value: type.name,
      })),
      default: "feat",
    },
    {
      type: "list",
      name: "emoji",
      message: "Select an emoji to prepend to your commit message:",
      choices: [
        { name: "✨  feat: A new feature", value: "✨" },
        { name: "🐛  fix: A bug fix", value: "🐛" },
        { name: "📚  docs: Documentation only changes", value: "📚" },
        { name: "💄  style: Changes that do not affect the meaning of the code", value: "💄" },
        { name: "♻️  refactor: A code change that neither fixes a bug nor adds a feature", value: "♻️" },
        { name: "✅  test: Adding missing tests or correcting existing tests", value: "✅" },
        { name: "🔧  chore: Changes to the build process or auxiliary tools", value: "🔧" },
      ],
      default: "✨",
    },
    {
      type: "input",
      name: "subject",
      message: "Write a short, descriptive commit message:",
      validate: (input) => !!input.trim() || "Commit message cannot be empty",
    },
  ];

  const answers = await inquirer.prompt(questions);

  let commitMessage = `${answers.emoji} ${answers.type}: ${answers.subject}`;

  commit(commitMessage);
};