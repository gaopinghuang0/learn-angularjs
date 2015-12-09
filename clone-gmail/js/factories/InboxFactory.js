/**
* Factory: InboxFactory
*/

angular.module('emailApp')
	.factory('InboxFactory', function($q, $http, $location) {
		'use strict';
		var exports = {};

		exports.messages = [];

		exports.goToMessage = function(id) {
			if (angular.isNumber(id)) {
				// $location.path('inbox/email' + id);
			}
		}

		exports.deleteMessage = function(id, index) {
			this.messages.splice(index, 1);
		}


		exports.getMessages = function() {
			var deferred = $q.defer();

			$http.get('json/emails.json')
				.success(function(data) {
					exports.messages = data;
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