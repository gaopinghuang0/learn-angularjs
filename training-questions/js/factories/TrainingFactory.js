/**
* Factory: TrainingFactory.js
*/

angular.module('myApp')
	.factory('TrainingFactory', 
		// give anonymous func a name to simplify debug
		function TrainingFactory($q, $http) {  
		'use strict';
		var exports = {};

		exports.questions = [];
		exports.options = [];

		exports.getQuestions = function(counter) {
			var deferred = $q.defer(),
				url;

			if (counter === 2) {
				url = 'json/training.json';
			} else if (counter === 1) {
				url = 'json/training2.json';
			} else {
				url = 'json/training3.json';
			}
			console.log(counter)

			$http.get(url)
				.success(function(data) {
					exports.questions = data;
					deferred.resolve(data);
				})
				.error(function(data) {
					console.log('There was an error!', data)
					deferred.reject(data);
				});
			return deferred.promise;
		}

		exports.getOptions = function() {
			var deferred = $q.defer();

			$http.get('json/options.json')
				.success(function(data) {
					exports.options = data;
					deferred.resolve(data);
				})
				.error(function(data) {
					console.log('There was an error!', data)
					deferred.reject(data);
				});
			return deferred.promise;
		};		

		return exports;
	});