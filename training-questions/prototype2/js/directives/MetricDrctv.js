/**
* Directive: MetricDrctv.js
*/

(function() {


	angular.module('myApp')
	.directive('metric', function MetricDrctv($timeout) {
		'use strict';

		return {
			restrict: 'EA',
			replace: true,
			scope: true,
			templateUrl: 'js/directives/metric.tmpl.html',
			controllerAs: 'metric',
			controller: function($scope, MetricFactory, TrainingFactory) {
				var self = this;
				this.valueList = [];
				this.ideaList = [];
				this.options = [];

				this.initList = function(n) {
					for (var i=0; i<n; i++) {
						this.valueList.push({value: "", valid: true});
					}

					// fetch 10 idea list
					MetricFactory.getIdeaList()
						.then(function() {
							self.ideaList = MetricFactory.ideaList;
						});
				};
				this.initList(3);

				this.evaluate = function(item) {
					var text = item.value;
					if (text && text.match(/\S+/g).length > 4) {
						item.valid = false;
					} else {
						item.valid = true;
					}
				};

				TrainingFactory.getOptions()
					.then(angular.bind(this, function then() {
						this.options = TrainingFactory.options;
					}));
			},
			link: function() {

			}
		}
	});

})();