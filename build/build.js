'use strict';

angular.module('webAppNetflix', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/main');
});
angular.module('webAppNetflix').controller('favoritesCtrl', function ($scope, mainService, storageUtils) {});
angular.module('webAppNetflix').config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider.state('favorites', {
		url: '/favorites',
		templateUrl: 'components/favorites/favorites.html',
		controller: 'favoritesCtrl'
	});
});
angular.module('webAppNetflix').factory('storageUtils', function () {

	return {
		getItem: function getItem(item) {

			return JSON.parse(window.localStorage.getItem(item));
		},
		setItem: function setItem(item, data) {

			try {
				window.localStorage.setItem(item, JSON.stringify(data));
			} catch (e) {
				window.localStorage.setItem(item, data);
			}

			return;
		}
	};
});
angular.module('webAppNetflix').controller('mainCtrl', function ($scope, mainService, storageUtils) {

	$scope.title = [];
	$scope.film;

	$scope.getFilm = function (title) {
		return mainService.getFilms(title).then(function (res) {
			$scope.title = res.data;
			var fav = storageUtils.getItem('favorites') || [];

			if (fav.length === 0) {

				fav.push(res.data);
				storageUtils.setItem('favorites', fav);
			} else {

				if (IsIdInArray(fav, res.data.show_id) === false) {
					fav.push(res.data);
					storageUtils.setItem('favorites', fav);
				}
			}
		}).catch($scope.titles = []);
	};

	function IsIdInArray(array, id) {
		var isTrue = false;

		array.forEach(function (item) {
			if (item.show_id === id) {
				isTrue = true;
			}
		});

		return isTrue;
	}
});
angular.module('webAppNetflix').service('mainService', function ($http, $q) {
	return {
		getFilms: getFilms
	};

	function getFilms(title) {
		var q = $q.defer();
		var req = {
			url: 'http://netflixroulette.net/api/api.php?title=' + title,
			method: 'GET'
		};

		$http(req).then(function (res) {
			return q.resolve(res);
		}).catch(function (err) {
			return q.reject(err);
		});

		return q.promise;
	}
});
angular.module('webAppNetflix').config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider.state('main', {
		url: '/main',
		templateUrl: 'components/main/main.html',
		controller: 'mainCtrl'
	});
});