var app = angular.module('linktalk', []);
app.controller('bookController', ['$scope','$http', function($scope,$http) {
    $scope.todos = [
      {text:'learn angular', done:true},
      {text:'build an angular app', done:false}];
 	$scope.books=[];
    $scope.allbooks1 = function() {
       $http({
       	method: 'get', 
       	url: "http://192.168.1.105:3000/rest",

       }).
        success(function(data, status) {
          $scope.status = status;
          $scope.data = data;
          console.log(data);
        }).
        error(function(data, status) {
          $scope.data = data || "Request failed";
          $scope.status = status;
          console.log(status);
      });
    };
    $scope.allbooks = function(){
    	fakeObj = [
    		{name:'解忧杂货店',url:'/views/web/viewer.html',img:'http://img5.douban.com/mpic/s27284878.jpg'},
    		{name:'百年孤独',url:'http://book.douban.com/subject/6082808/',img:'http://img3.douban.com/mpic/s6384944.jpg'}
    	];
    	$scope.books = fakeObj;
    };
    $scope.allbooks();
}]);