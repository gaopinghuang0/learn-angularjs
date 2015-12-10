/**
 * Controller: InboxCtrl
*/

angular.module('emailApp')
	.controller('InboxCtrl', 
		// name anonymous func to help debug
		function InboxCtrl() {
			'use strict';

			// Why use this?
			this.title = 'My Inbox';
		});
