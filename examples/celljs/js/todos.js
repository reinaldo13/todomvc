var todos = {
  $cell: true,
  class: 'main',
  $type: 'section',
  id: 'todos',
  $update: function(){
    this.querySelector("#todo-list")._refresh();
  },
  _items: [],
  $components: [
    {
      // Select-all toggle.
      $type: 'input',
      class: 'toggle-all',
      type: 'checkbox'
    },
    {
      // Label for toggle.
      for: 'toggle-all',
      $type: 'label',
      $text: 'Mark all as complete'
    },
    {
      // The todo list.
      $type: 'ul',
      class: 'todo-list',
      id: 'todo-list',
      _refresh: function(){
        this.$components = this._items.map(
          function(item){
            return {
              $type: "li",
              id: item.id,
              _editing: false,
              $update: function() {
                if (this._editing) {
                  this.class = this.class + ' editing';
                  this.$components.unshift({
                    $type: 'input',
                    class: 'edit',
                    id: 'editing-' + item.id,
                    value: item.title,
                    _saveItem: function() {
                      for (var i in this._items) {
                        if (this._items[i].id == item.id) {
                           this._items[i].title = this.value;
                           break;
                        }
                      }
                      this._editing = false;
                    },
                    onkeyup: function(e) {
                      if(e.keyCode === 27) {
                        this._saveItem();
                      }
                    },
                    onblur: function(e) {
                      this._saveItem();
                    }
                  });
                  setTimeout(function() {
                    // Give it time for the editing field to be mounted.
                    document.querySelector('#editing-' + item.id).focus();
                    document.querySelector('#editing-' + item.id).value = item.title;
                  }, 10);
                } else {
                  this.class = this.class.replace('editing', '');
                  this.$components.splice(0,1);
                }
              },
              class: item.completed ? 'completed' : '',
              $components: [
                {
                  class: 'view',
                  $components: [
                    {
                      $type: 'input',
                      class: 'toggle',
                      type: 'checkbox',
                      checked: item.completed ? true : null,
                      onchange: function() {
                        for (var i in this._items) {
                          if (this._items[i].id == item.id) {
                             this._items[i].completed = !this._items[i].completed;
                             break;
                          }
                        }
                      }
                    },
                    {
                      $type: 'label',
                      $text: item.title,
                      ondblclick: function () {
                        this._editing = true;
                      }
                    },
                    {
                      $type: 'button',
                      class: 'destroy',
                      onclick: function() {
                        for (var i in this._items) {
                          if (this._items[i].id == item.id) {
                             this._items.splice(i, 1);
                             break;
                          }
                        }
                      }
                    }
                  ]
                }
              ]
            };
          }
        )
      }
    }
  ]
};
