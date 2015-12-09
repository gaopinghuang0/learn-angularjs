/**
 * Controller: InboxCtrl
*/

angular.module('emailApp')
	.controller('InboxCtrl', function($scope, InboxFactory) {
			'use strict';
			$scope.meta = {
				title: 'My Inbox'
			};
			InboxFactory.getMessages()
				.success(function(jsonData, statusCode) {
					console.log('The request was successful!', statusCode);
					console.dir(jsonData);
					// Now add the email messages to the controller's scope
					$scope.data = {
						emails: jsonData
					};
				});
		});
