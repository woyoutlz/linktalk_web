var app = angular.module('linktalk', []);
app.controller('bookController', ['$scope', function($scope) {
    $scope.todos = [
      {text:'learn angular', done:true},
      {text:'build an angular app', done:false}];
 
    $scope.allbooks = function() {
      alert("ok")
    };
}]);