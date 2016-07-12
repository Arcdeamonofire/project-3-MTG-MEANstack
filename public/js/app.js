var app = angular.module('MagicDeckApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode({enabled:true});

	$routeProvider.when('/', {
		templateUrl: 'partials/home.html'
	}).when('/signup', {
		templateUrl: 'partials/signup.html',
		controller: 'SignUp',
		controllerAs: 'submit'
	}).when('/search', {
		templateUrl: 'partials/search.html'
	}).when('/login', {
		templateUrl: 'partials/login.html'
	});
}]);

app.controller('SignUp', ['$http', '$scope', function($http, $scope) {
	console.log('this is the sign up page');

	this.signUp = function() {
		console.log('signing up a new Planeswalker');
		console.log('Planeswalker\'s data: ', this.form);

		$http({
			method: 'POST',
			url: '/users',
			data: this.form})
		// }). then(function(result){
		// 	console.log(result.data);
		// })
	}
}]);