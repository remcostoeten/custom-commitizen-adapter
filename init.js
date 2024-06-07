'use strict';


async function loadInquirer() {
  const inquirer = await import('inquirer');
  return inquirer.default;
}

exports.prompter = async function (cz, commit) {
  const inquirer = await loadInquirer();
  inquirer.prompt([
      {
        type: 'input',
        name: 'subject',
        message: 'Write a short description of the change:'
      },
      {
        type: 'input',
        name: 'body',
        message: 'Provide a longer description of the change:'
      },
      {
        type: 'confirm',
        name: 'isBreaking',
        message: 'Are there any breaking changes?',
        default: false
      },
      {
        type: 'input',
        name: 'breakingBody',
        message: 'Describe the breaking changes:',
        when: function (answers) {
          return answers.isBreaking;
        }
      },
      {
        type: 'confirm',
        name: 'isIssueAffected',
        message: 'Does this change affect any open issues?',
        default: false
      },
      {
        type: 'input',
        name: 'issuesBody',
        message: 'If issues are affected, list them:',
        when: function (answers) {
          return answers.isIssueAffected;
        }
      }
    ]).then(function (answers) {
      var commitMessage = answers.subject + '\n\n' + answers.body;

      if (answers.isBreaking) {
        commitMessage += '\n\nBREAKING CHANGE: ' + answers.breakingBody;
      }

      if (answers.isIssueAffected) {
        commitMessage += '\n\nIssues: ' + answers.issuesBody;
      }

       commit(commitMessage);
    }
  );
}
