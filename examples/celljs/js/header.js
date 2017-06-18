var header = {
  $cell: true,
  class: 'header',
  $type: 'header',
  id: 'header',
  $components: [
    {
      // Main tittle.
      $type: 'h1',
      $text: 'todos'
    },
    {
      // Input field.
      class: 'new-todo',
      $type: 'input',
      placeholder: 'What needs to be done?',
      autofocus: true
    }
  ]
};
