module.exports = function (plop) {
  plop.setGenerator('form', {
    description: 'Generate a dynamic form component',
    prompts: [
      {
        type: 'input',
        name: 'componentName',
        message: 'What is the name of your component?',
      },
      {
        type: 'checkbox',
        name: 'inputFields',
        message: 'Select the input fields for your form:',
        choices: [
          {
            name: 'Text Input',
            value: 'TextInput',
          },
          {
            name: 'Email Input',
            value: 'EmailInput',
          },
          {
            name: 'Number Input',
            value: 'NumberInput',
          },
        ],
      },
      {
        type: 'input',
        name: 'additionalFields',
        message: 'How many additional input fields would you like to add?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'components/{{pascalCase componentName}}.jsx',
        templateFile: 'templates/Form.jsx.hbs',
        abortOnFail: true,
      },
      {
        type: 'modify',
        path: 'components/{{pascalCase componentName}}.jsx',
        pattern: /({{inputFields}})/g,
        template:
          "{{#each inputFields}}{{> inputField}}{{/each}}{{#times additionalFields}}{{> inputField}}{{/times}}",
      },
    ],
  });

  plop.setPartial('inputField', '{{> (lookup . "value") }}\n');

  plop.setActionType('times', function (answers, config, plop) {
    let iterations = parseInt(config.trim(), 10);
    let output = '';
    for (let i = 0; i < iterations; i++) {
      output += plop.renderString(config.template, { iteration: i });
    }
    return output;
  });

  plop.setHelper('value', function (input) {
    switch (input) {
      case 'TextInput':
        return '<input type="text" />';
      case 'EmailInput':
        return '<input type="email" />';
      case 'NumberInput':
        return '<input type="number" />';
      default:
        return '';
    }
  });
};
