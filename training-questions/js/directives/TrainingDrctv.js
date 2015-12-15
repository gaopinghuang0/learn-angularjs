/**
* Directive: TrainingDrctv.js  <training></training>
*/

angular.module('myApp')
	.directive('training', function TrainingDrctv($timeout) {
		'use strict';

		return {
			restrict: 'EA',
			replace: true,
			scope: true,
			templateUrl: 'js/directives/training.tmpl.html',
			controllerAs: 'training',
			controller: function($scope, TrainingFactory) {
				this.questions = [];
				this.options = [];
				this.title = "Identify the error";
				this.show = true;

				TrainingFactory.getQuestions()
					.then(angular.bind(this, function then() {
						this.questions = TrainingFactory.questions;
					}));

				TrainingFactory.getOptions()
					.then(angular.bind(this, function then() {
						this.options = TrainingFactory.options;
					}));
			},
			link: function(scope, element, attrs, ctrl) {
				// var textarea = element.find('.email__response-text')[0];
				// scope.$watch('reply', function(newVal, oldVal) {
				// 	if (newVal === oldVal) return;
				// 	if (newVal) {
				// 		$timeout(function() {
				// 			textarea.focus();
				// 		}, 0);
				// 	}
				// })
			}
		}
	});