/**
* Controller: MainCtrl.js
*/

angular.module('myApp')
	.controller("MainCtrl", function MainCtrl($scope, $http) {

		$scope.passTraining = function() {
			$(".training-view").animate({height: '0',
				opacity: 0}, 1000, function() {
					$(".training-view").css("display", "None");
					$scope.certificateWork(true);
					$(".metric-view").css("display", "block")
						.animate({opacity: 1}, 1500);
			});
		}

		// hide training and metric, show training-failed alert 
		$scope.failTraining = function() {
			$(".training-view").animate({height: '0',
				opacity: 0}, 1000, function() {
					$(".training-view").css("display", "None");
					$scope.certificateWork(false);
			});
			//TODO: save to database
		}

		$scope.certificateWork = function(isPassed) {
			var _class, _text;

			if (isPassed) {
				_class = 'alert alert-success';
				_text = 'You have passed the training!';
			} else {
				_class = 'alert alert-danger';
				_text = 'You have failed the training! You cannot take this HIT';
			}
			$('.certificate-view').addClass(_class).text(_text);
		}

		$scope.getCertificate = function() {
			// get worker's certificate from db
			$http.get('json/db.json')
				.success(function(data) {
					if (data.certificate) {
						$scope.passTraining();
					}
				})
				.error(function(data) {
					console.log('There was an error!', data)
				});
		}

		$scope.getCertificate();

	});
