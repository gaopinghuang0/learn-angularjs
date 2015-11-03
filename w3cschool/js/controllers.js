var app = angular.module('myApp', []);
app.controller('personCtrl', function($scope) {
	$scope.firstName = "John";
	$scope.lastName = "Doe";
	$scope.fullName = function() {
		return $scope.firstName + " " + $scope.lastName;
	}
});

app.controller('namesCtrl', function($scope) {
	$scope.names = [
        {name:'Jani',country:'Norway'},
        {name:'Hege',country:'Sweden'},
        {name:'Kai',country:'Denmark'}
    ];
});


app.controller("costCtrl", function($scope) {
	$scope.quantity = 1;
	$scope.price = 9.8;
});


app.controller("customersCtrl", function($scope, $http) {
	$http.get("http://www.w3schools.com/angular/customers.php")
	.success(function(response) {$scope.names = response.records;});
});