/**
* Controller: MainCtrl.js
*/

angular.module('myApp')
	.controller("MainCtrl", function MainCtrl($scope) {

		$scope.initMetric = function() {
			$(".training-view").animate({height: '0',
				opacity: 0}, 1000, function() {
					$(".training-view").css("display", "None");
					$(".metric-view").css("display", "block")
						.animate({opacity: 1}, 1500);
			});
		}
	});