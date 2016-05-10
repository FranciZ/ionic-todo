angular.module('starter').factory('todoService', function($localForage){

  var todoService = {

    model:{
      list:[]
    },
    addTodo:function(todo){

      todo.id = guid();

      if(todo.dueDate){

        cordova.plugins.notification.local.schedule({
          id: 10,
          title: todo.title,
          text: todo.dueDate,
          at: todo.dueDate,
          data: { todoId:todo.id }
        });

      }

      $localForage.getItem('todos')
        .then(function(todos){

          // if todos does not exist create array
          if(!todos) todos = [];

          // push new to do to array
          todos.push(todo);

          // save the todos array back to localstorage
          return $localForage.setItem('todos', todos);

        })
        .then(function(todos){

          // instead of updating the reference we need to extend
          // the current list with the new one using angular.extend
          // todoService.model.list = todos; // WRONG

          angular.extend(todoService.model.list,todos);

        });

    },
    getTodos:function(){

      $localForage.getItem('todos')
        .then(function(todos){

          angular.extend(todoService.model.list,todos);

        });

    },
    /**
     * Accepts id of the to-do you want to remove
     * @param id
     */
    removeTodo:function(id){

      $localForage.getItem('todos')
        .then(function(todos){

          angular.forEach(todos, function(todo, i){

            if(todo.id === id){
              todos.splice(i,1);
            }

          });

          angular.forEach(todoService.model.list, function(todo, i){

            if(todo.id === id){
              todoService.model.list.splice(i,1);
            }

          });

          return $localForage.setItem('todos', todos)
            .then(function(todos){

            });

        });

    },
    updateTodo:function(){



    }

  };

  return todoService;

});
