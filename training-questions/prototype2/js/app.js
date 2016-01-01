(function() {

angular.module("myApp", [])
	.config(['$interpolateProvider', 
	function($interpolateProvider) {
	$interpolateProvider.startSymbol("{[");
	$interpolateProvider.endSymbol("]}");
}]);

// resolve conflict with jinja2


// shortcut for loop range
angular.module("myApp").filter('range', function() {
	return function(input, total) {
		total = parseInt(total);
		for (var i=0; i<total; i++) {
			input.push(i);
		}
		return input;
	};
});

// replace whitespace in string with dash '-'
angular.module("myApp").filter('replaceSpace', function() {
  return function(text) {
    if (!text) {
      return "";
    }
    var str = text.replace(/\s+/g, '-');
    return str.toLowerCase();
  };
});

})();