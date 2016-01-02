/**
* Controller: MainCtrl.js
*/

angular.module('myApp')
	.controller("MainCtrl", function MainCtrl($scope, $http) {
		var training = $('.training-view'),
			metric = $('.metric-view'),
			certificate = $('.certificate-view'),
			StatusEnum = {
				CURRENT_PASS: 2,
				HISTORY_PASS: 1,
				FIRST_TIME: 0,
				HISTORY_FAIL: -1,
				CURRENT_FAIL: -2
			};

		$scope.initView = function(passStatus) {
			$scope.certificateAlert(passStatus);

			switch (passStatus) {
				case StatusEnum.CURRENT_PASS:
				case StatusEnum.HISTORY_PASS:
					training.hide();
					metric.show().animate({opacity: 1}, 1500);
					break;
				case StatusEnum.CURRENT_FAIL:
				case StatusEnum.HISTORY_FAIL:
					training.hide();
					break;
				case StatusEnum.FIRST_TIME:
					training.show();
					break;
			}

		}

		$scope.switchView = function(passStatus) {
			// $scope.certificateAlert(passStatus);
			training.animate({
				height: 0, 
				opacity: 0
			}, 1000, function() {
				$scope.initView(passStatus);
			});
		}

		$scope.passTraining = function() {
			// $scope.switchView(StatusEnum.CURRENT_PASS);
			$('#toggle-tutorial').click();
			//TODO: save to database
		}

		// hide training and metric, show training-failed alert 
		$scope.failTraining = function() {
			$scope.switchView(StatusEnum.CURRENT_FAIL);
			//TODO: save to database
			//TODO: validate the checkout button 
		}

		$scope.certificateAlert = function(passStatus) {
			var _class, _text;

			switch (passStatus) {
				case StatusEnum.CURRENT_PASS:
					_class = 'alert alert-success';
					_text = '<strong>Congratulation!</strong> You have passed the training! You are able to take the actual HIT now. Your work on the training process will be paid by means of bonus.';
					break;
				case StatusEnum.HISTORY_PASS:
					_class = 'alert alert-success';
					_text = 'Based on our record, you have passed the training!';
					break;
				case StatusEnum.CURRENT_FAIL:
					_class = 'alert alert-danger';
					_text = '<strong>Sorry!</strong> You have failed the training! You cannot take this HIT. But you can submit the work by clicking the checkout button. Your work will be accepted to thanks for your effort in the training process.';
					break;
				case StatusEnum.HISTORY_FAIL:
					_class = 'alert alert-danger';
					_text = '<strong>Sorry!</strong> Based on our record, You have failed the training! You cannot take this HIT!';
					break;
				case StatusEnum.FIRST_TIME:
					_class = 'alert alert-info';
					_text = 'Based on our record, you have to pass a '
					+'training process before actually taking the HIT.'
					+' Once you pass the training, you can take the HIT'
					+' without training in the future. However, if you'
					+' fail, you can retake the training up to twice.';
					break;
			}

			$scope.switchAlertClass(certificate, _class);
			certificate.html(_text);
		}

		$scope.getPassStatus = function() {
			// get worker's certificate from db
			$http.get('json/status.json')
				.success(function(data) {
					var passStatus = parseInt(data.certificate);

					$scope.initView(passStatus);
				})
				.error(function(data) {
					console.log('There was an error!', data)
				});
		}
		$scope.getPassStatus();

		$scope.switchAlertClass = function(obj, new_class) {
			var classes = obj[0].className.split(" ").filter(function(ob) {
				return !ob.startsWith("alert");
			});
			obj[0].className = classes.join(" ");
			obj.addClass(new_class);
		}


	});
