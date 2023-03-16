module.exports = function (plop) {
  plop.setGenerator("form", {
    description: "Generate a dynamic form with dynamic inputs",
    prompts: [
      {
        type: "input",
        name: "formName",
        message: "What is the name of the form?",
      },
      {
        type: "input",
        name: "numberOfInputs",
        message: "How many inputs do you want to add to the form?",
      },
    ],
    actions: (data) => {
      const actions = [];

      actions.push({
        type: "add",
        path: "components/forms/{{pascalCase formName}}Form.js",
        templateFile: "templates/FormTemplate.js.hbs",
      });

      for (let i = 0; i < data.numberOfInputs; i++) {
        actions.push({
          type: "add",
          path: `components/forms/{{pascalCase formName}}Input${i + 1}.js`,
          templateFile: "templates/InputTemplate.js.hbs",
        });
      }

      return actions;
    },
  });
};
