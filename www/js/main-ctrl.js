
angular.module('starter').controller('MainCtrl', function(
  $scope,
  $ionicModal,
  todoService
){

  $scope.todoModel = {
    dueDate : new Date(Date.now()+1000*60*60*24),
  };

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

    /*

    console.log($scope.todoModel);

    if(!$scope.todoModel.dueDateToggle){
      delete $scope.todoModel.dueDate;
    }

    // { title:'My to do'}
    todoService.addTodo($scope.todoModel);

    $scope.todoModel = {
      dueDate : new Date(Date.now()+1000*60*60*24),
    };
    */

    var options = { method:"feed" };
    facebookConnectPlugin.showDialog(options,
      function (result) {
        alert("Posted. " + JSON.stringify(result));             },
      function (e) {
        alert("Failed: " + e);
      });

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
