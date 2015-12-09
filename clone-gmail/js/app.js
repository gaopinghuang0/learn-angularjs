angular.module('emailApp', [
	'ngRoute'
]).config(function($routeProvider) {
	'use strict';
	// configure urls
	$routeProvider
		.when('/inbox', {  // inbox route
			templateUrl: 'views/inbox.html',
			controller: 'InboxCtrl',  // map js to html scope
		})
		.otherwise({  // default
			redirectTo: '/inbox'
		});
});