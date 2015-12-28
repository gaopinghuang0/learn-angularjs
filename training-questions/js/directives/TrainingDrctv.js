/**
* Directive: TrainingDrctv.js  <training></training>
*/
(function() {

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
				var self = this;
				this.questions = [];
				this.options = [];
				this.title = "Identify the error";
				$scope.show = false;
				$scope.actions = {
					initMetric: function() {
						console.log("init metric")
						$scope.initMetric();
					},
					retake: function() {
						$scope.postCheck = !$scope.postCheck;
						console.log("retake")
						TrainingFactory.retakeQuestion()
							.then(function() {
								self.questions = TrainingFactory.questions;
							})
						$scope.show = false;
					}
				};

				TrainingFactory.getQuestions()
					.then(angular.bind(this, function then() {
						this.questions = TrainingFactory.questions;
					}));

				TrainingFactory.getOptions()
					.then(angular.bind(this, function then() {
						this.options = TrainingFactory.options;
					}));

				this.checkQuestion = function(quesID, optionID, isChecked) {
					var result = {_class: "", content: ""},
						question, matched;


					question = this.questions.filter(function(obj) {
						return 'id' in obj && parseInt(obj.id) === parseInt(quesID);
					});

					if (question.length) {
						matched = question[0].solutions.filter(function(obj) {
							return 'id' in obj && parseInt(obj.id) === parseInt(optionID);
						});

						if (matched.length) {  // should be checked
							if (isChecked) {
								result._class = "alert alert-success";
								result.content = "Well done!";
								result.pass = true;
							} else {
								result._class = "alert alert-danger";
								result.content = matched[0].reason;
								result.pass = false;
							}
						} else {  // should not be checked
							if (isChecked) {
								result._class = "alert alert-danger";
								result.content = "Sorry, it's incorrect!";
								result.pass = false;
							} else {
								result._class = "alert alert-success";
								result.content = "Well done!";
								result.pass = true;
							}
						}
					}

					return result;
				}

			},
			link: function(scope, element, attrs, ctrl) {
				element.find("#check_answer").bind("click", function() {
					var isPassed = true;

					element.find(".training__options").each(function(ind, val) {
						var quesID = $(this).attr("data-ques-id");
						$(this).find(".training__options-option").each(function(index, value) {
							var checkbox = $(this).find(".training__options-checkbox"),
								isChecked = checkbox.prop("checked"),
								optionID = checkbox.attr("data-option-id"),
								comment = $(this).find(".comment-content"), 
								result;
							
							result = ctrl.checkQuestion(quesID, optionID, isChecked);
							isPassed = isPassed && result.pass;
							// remove existing classes startsWith "alert"
							switch_alert_class(comment, result._class);
							comment.html(result.content);
						});
					});

					update_action(isPassed);

					scope.$apply(function() {
						scope.show = true;
					})
				});

				function switch_alert_class(obj, new_class) {
					var classes = obj[0].className.split(" ").filter(function(ob) {
						return !ob.startsWith("alert");
					});
					obj[0].className = classes.join(" ");
					obj.addClass(new_class);
				}

				function update_action(isPassed) {
					var actObj = element.find(".training__actions-after"),
						span = actObj.find("span"),
						btn = actObj.find("#after_check");

					if (isPassed) {
						switch_alert_class(actObj, "alert alert-success");
						span.html("<strong>You pass the training!</strong>");
						btn.attr("value", "Start HIT");
						scope.$apply(function() {
							scope.action = scope.actions['initMetric'];
						});
					} else {
						switch_alert_class(actObj, "alert alert-warning");
						span.html("<strong>You failed the training!</strong>" +
							" You can retake <u>one</u> additional training.");
						btn.attr("value", "Retake training");
						scope.$apply(function() {
							scope.action = scope.actions['retake'];
						});
					}
				}
			}
		}
	});


})();
