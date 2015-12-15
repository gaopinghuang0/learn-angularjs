(function() {

angular.module("myApp", ['ngRoute'])
	.config(['$interpolateProvider', 
	function($interpolateProvider) {
	$interpolateProvider.startSymbol("{[");
	$interpolateProvider.endSymbol("]}");
}]);

// resolve conflict with jinja2


// // shortcut for loop range
// app.filter('range', function() {
// 	return function(input, total) {
// 		total = parseInt(total);
// 		for (var i=0; i<total; i++) {
// 			input.push(i);
// 		}
// 		return input;
// 	};
// });

// // replace whitespace in string with dash '-'
// app.filter('replaceSpace', function() {
//   return function(text) {
//     if (!text) {
//       return "";
//     }
//     var str = text.replace(/\s+/g, '-');
//     return str.toLowerCase();
//   };
// });

})();