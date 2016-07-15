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
	}).when('/search/:searchColor', {
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
	}).when('/users/:id', {
		templateUrl: 'partials/users.html'
	});
}]);

app.controller('Index', ['$http', '$scope', function($http, $scope) {
	console.log('this is the index page');
	var index = this;

	this.randomNames = ['myLittleBrony', 'BubbleButt1986', 'KakaoFriends119', 'Cicada3301', 'JetFuelSteelBeams'];
	this.randomName = function() {
		return index.randomNames[Math.floor(Math.random()*5)];
	}

	$scope.noUser = true;

	$scope.$on('showCard', function(event, data){
		// console.log(data);
		index.cards = data.cards;
		$scope.cards = index.cards;
	});

	$scope.$on('getUser', function(event, data){ //gets User info to push to front-end
		index.user = data.userLogged;
		$scope.user = index.user;
	
		if ($scope.user.userName !== undefined) { //nav bar links, w/o final suffix = bad PW return user profile
			index.navVar = 'WELCOME, ' + index.user.userName;
			index.navLink = '/users/{{index.user._id}}';
			$scope.noUser = false;
		};

		if(index.user.gender == 'male') { //changes User's avatar based on gender declaration
			index.userImage = '../img/user-m.jpg';
		} else {
			index.userImage = '../img/user-f.jpg';
		};

	});

}]);

app.controller('SignUp', ['$http', '$scope', '$location', '$window', function($http, $scope, $location, $window) {
	console.log('this is the sign up page');

	this.signUp = function() {
		console.log('signing up a new Planeswalker');
		console.log('Planeswalker\'s data: ', this.form);

		$http({
			method: 'POST',
			url: '/users',
			data: this.form
		}).then(function(result){
			// console.log(result)
			if(result.data !== ""){
				console.log(result.data);
				userLogged = result.data;
				$scope.$emit('getUser', {
					userLogged: userLogged
			});
				$location.url('/');
				$location.replace();
				$window.history.pushState(null, 'any', $location.absUrl());
			} else {
				console.log('Username already exists pls try again')
			}
		}).then(function(err){
			$scope.badPassword = true;
		});
	}
}]);

app.controller('LogIn', ['$http', '$scope', '$location', '$window', function($http, $scope, $location, $window) {
	console.log('this is the log in page');

	$scope.badPassword = false;

	this.logIn = function() {
		console.log('a Planeswalker is logging in!');
		console.log('Planeswalker\'s data: ', this.form);

		$http({
			method: 'POST',
			url: '/users/login',
			data: this.form
		}).then(function(result){
			// console.log(result.data);
			userLogged = result.data;
			$scope.$emit('getUser', {
				userLogged: userLogged
			});
			console.log('redirecting to home')
			$location.url('/');
			$location.replace();
			$window.history.pushState(null, 'any', $location.absUrl());
		}).then(function(err){
			$scope.badPassword = true;
		});
	}
}]);

app.controller('Search', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
	console.log('this is the search page');
	var search = this;

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

	if ($routeParams.searchColor !== undefined){
		search.find($routeParams.searchColor)
	};

}]);

// app.controller('UserController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
// 	console.log('this is the user page');
// 	var userThis = this;
// 	u = $scope.user._id

// 	this.find = function(u) {
// 		console.log('user page loading');

// 		$http({
// 			method: 'GET',
// 			url: 'users/'+u
// 		}).then(function(result){
// 			console.log(result)
// 		})
// 	}

// }]);
	
app.controller('Show', ['$http', '$scope', '$routeParams', '$filter', function($http, $scope, $routeParams, $filter) {
	console.log('this is the show page');
	// console.log('this id is: ' + $routeParams.cardid);
	var show = this;
	show.card = $filter('filter')($scope.$parent.cards, function (d) {return d.id === $routeParams.cardid;})[0];
	console.log(this.card);
	this.addCard = function(){
		$http({
			method:'POST',
			url: '/users/deck',
			data: show.card
		}).then(function(result){
			console.log('added card');
			console.log(result.data);
		})
	}
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