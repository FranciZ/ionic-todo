
angular.module('starter').controller('MainCtrl', function(
  $scope,
  $ionicModal,
  todoService
){

  $scope.todoModel = {};
  $scope.todos = todoService.model.list;


  function init(){

    todoService.getTodos();

  }

  init();

  $scope.languages = {

    'Slovenski':{
      submit:'Dodaj',
      delete:'Zbrisi',
      selectLanguage:'Izberi jezik'
    },
    'English':{
      submit:'Submit',
      delete:'Delete',
      selectLanguage:'Select language'
    },
    'Deutsch':{
      submit:'Schubmit',
      delete:'Zbrisi',
      selectLanguage:'Schelect language'
    }

  };

  $scope.locales = {
    ui : $scope.languages.Slovenski
  };

  $scope.addTodoClick = function(){

    // { title:'My to do'}
    todoService.addTodo($scope.todoModel);

  };

  $scope.removeTodoClick = function(id){

    todoService.removeTodo(id);

  };

  $scope.setLanguage = function(translations){

    $scope.locales.ui = translations;
    $scope.modal.hide();

  };

  $scope.addPersonClick = function(){

    navigator.contacts.pickContact(function(contact){

      $scope.todoModel.contact = {
        displayName : contact.displayName,
        id          : contact.id
      };

      $scope.$apply();

    },function(err){



    });

  };

  $scope.onLanguageClick = function(){

    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });

  };

});
