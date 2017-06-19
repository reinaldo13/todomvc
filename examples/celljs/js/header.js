var header = {
  $cell: true,
  class: 'header',
  $type: 'header',
  id: 'header',
  _createTodo: function(title) {
    return {
      title: title,
      completed: false,
      id: document.querySelector("#todos")._items.length + 1
    }
  },
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
      autofocus: true,
      onkeyup: function(e){
        if(e.keyCode === 13) {
          document.querySelector("#todos")._items.push(
            this._createTodo(this.value)
          );
          this.value = '';
        }
      }
    }
  ]
};
