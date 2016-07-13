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
		templateUrl: 'partials/search.html',
		controller: 'Search',
		controllerAs: 'search'
	}).when('/login', {
		templateUrl: 'partials/login.html',
		controller: 'LogIn',
		controllerAs: 'login'
	}).when('/show/:cardid', {
		templateUrl: 'partials/show.html',
		controller: 'Show',
		controllerAs: 'show'
	});
}]);

app.controller('Index', ['$http', '$scope', function($http, $scope) {
	console.log('this is the index page');
	var index = this;
	$scope.$on('showCard', function(event, data){
		// console.log(data);
		index.cards = data.cards;
		$scope.cards = index.cards;
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
			data: this.form
		}).then(function(result){
			console.log(result.data);
			window.location.pathname = "/";
		})
	}
}]);

app.controller('LogIn', ['$http', '$scope', function($http, $scope) {
	console.log('this is the log in page');

	this.logIn = function() {
		console.log('a Planeswalker is logging in!');
		console.log('Planeswalker\'s data: ', this.form);

		$http({
			method: 'POST',
			url: '/users/login',
			data: this.form
		}).then(function(result){
			console.log(result.data);
			window.location.pathname = "/";
		})
	}
}]);

app.controller('Search', ['$http', '$scope', function($http, $scope) {
	console.log('this is the search page');
	var search = this;
	search.count = 0;
	this.find = function(color) {
		console.log('patience Walker looking into your request');

		$http({
			method: 'GET',
			url: 'https://api.magicthegathering.io/v1/cards?colors='+color+'&pageSize=500',
		}).then(function(result){
			// console.log(result.data.cards);
			search.cards = result.data.cards;
			$scope.$emit('showCard', {
            	cards:search.cards
        	});
		})
	}

}]);
	
app.controller('Show', ['$http', '$scope', '$routeParams', '$filter', function($http, $scope, $routeParams, $filter) {
	console.log('this is the show page');
	// console.log('this id is: ' + $routeParams.cardid);
	var show = this;
	show.card = $filter('filter')($scope.$parent.cards, function (d) {return d.id === $routeParams.cardid;})[0];
	console.log(show.card);
	// $scope.$on('cards', function(event, data){
 //    	// console.log(event);
 //    	show.data = data;
 //    	console.log(data);

	// });
	// console.log(show.data);
}]);


app.controller('HomeController', function() {

	this.include_what = 'partials/what.html';
	this.include_who  = 'partials/who.html';
	this.include_how  = 'partials/how.html';

	this.switchAboutWhat = function() {
		this.include_about = '';
		this.include_about = 'partials/what.html';
	};

	this.switchAboutWho = function() {
		this.include_about = '';
		this.include_about = 'partials/who.html'
	};

	this.switchAboutHow = function() {
		this.include_about = '';
		this.include_about = 'partials/how.html'
	};

});