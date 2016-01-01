/**
* Factory: MetricFactory.js
*/

angular.module('myApp')
	.factory('MetricFactory', 
		// give anonymous func a name to simplify debug
		function MetricFactory($q, $http) {  
		'use strict';
		var exports = {};

		exports.ideaList = [];

		exports.getIdeaList = function() {
			var deferred = $q.defer();

			$http.get('json/ideaList.json')
				.success(function(data) {
					exports.ideaList = data;
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