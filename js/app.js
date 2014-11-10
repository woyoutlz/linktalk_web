var app = angular.module('linktalk', []);
app.controller('bookController', ['$scope','$http', function($scope,$http) {
    $scope.todos = [
      {text:'learn angular', done:true},
      {text:'build an angular app', done:false}];
 
    $scope.allbooks = function() {
       $http({
       	method: 'get', 
       	url: "http://192.168.1.105:3000/rest",

       }).
        success(function(data, status) {
          $scope.status = status;
          $scope.data = data;
          console.log(data)
        }).
        error(function(data, status) {
          $scope.data = data || "Request failed";
          $scope.status = status;
          console.log(status);
      });
    };
}]);