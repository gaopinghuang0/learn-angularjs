angular.module('emailApp', [
	'ngRoute'
]).config(function($routeProvider) {
	'use strict';
	// configure urls
	$routeProvider
		.when('/inbox', {  // inbox route
			templateUrl: 'views/inbox.html',
			controller: 'InboxCtrl',  // map js to html scope
			controllerAs: 'inbox'
		})
		.when('/inbox/email/:id', {
			templateUrl: 'views/email.html',
			controller: 'EmailCtrl',
			controllerAs: "email"
		})
		.otherwise({  // default
			redirectTo: '/inbox'
		});
});