var app = angular.module('MagicDeckApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode({enabled:true});

	$routeProvider.when('/', {
		templateUrl: 'partials/home.html'
	}).when('/signup', {
		templateUrl: 'partials/signup.html'
	}).when('/search', {
		templateUrl: 'partials/search.html'
	}).when('/login', {
		templateUrl: 'partials/login.html'
	});
}]);