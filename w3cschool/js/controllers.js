app.controller('personCtrl', function($scope) {
	$scope.firstName = "John";
	$scope.lastName = "Doe";
	$scope.myVar = false;
	$scope.fullName = function() {
		return $scope.firstName + " " + $scope.lastName;
	}
	$scope.toggle = function() {
		$scope.myVar = !$scope.myVar;
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


app.controller("myCtrl", function($scope) {
	$scope.count = 0;
});


app.controller("formCtrl", function($scope) {
	$scope.master = {firstName: 'John', lastName: "Doe"};
	$scope.reset = function() {
		$scope.user = angular.copy($scope.master);
	};
	$scope.reset();
});


app.controller("validateCtrl", function($scope) {
	$scope.user = 'John Doe';
	$scope.email = 'John.doe@gmail.com';
});


