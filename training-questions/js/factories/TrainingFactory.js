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

		exports.checkQuestion = function(id) {
			// 
		}

		exports.retakeQuestion = function(id, index) {
			var deferred = $q.defer();

			$http.get('json/training2.json')
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

		exports.getQuestions = function() {
			var deferred = $q.defer();

			$http.get('json/training.json')
				.success(function(data) {
					exports.questions = data;
					deferred.resolve(data);
				})
				.error(function(data) {
					console.log('There was an error!', data)
					deferred.reject(data);
				});
			return deferred.promise;
		};

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