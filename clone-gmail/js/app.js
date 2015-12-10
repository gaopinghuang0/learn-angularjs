angular.module('emailApp', [
	'ngRoute',
	'ngSanitize'
]).config(function($routeProvider) {
	'use strict';
	// configure urls
	$routeProvider
		.when('/inbox', {  // inbox route
			templateUrl: 'views/inbox.html',
			controller: 'InboxCtrl',  // map js to html scope
			controllerAs: 'inboxTest'
		})
		.when('/inbox/email/:id', {
			templateUrl: 'views/email.html',
			controller: 'EmailCtrl',
			controllerAs: "emailTest"
		})
		.otherwise({  // default
			redirectTo: '/inbox'
		});
}).run(function($rootScope) {
	// help to dubug route error
	$rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
		console.log(event, current, previous, rejection);
	});
});