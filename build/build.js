'use strict';

angular.module('webAppNetflix', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/main');
});
angular.module('webAppNetflix').controller('favoritesCtrl', function ($scope, mainService, storageUtils) {

	$scope.favs = storageUtils.getItem('favorites') || [];
	$scope.years = [];
	$scope.genres = [];

	$scope.favs.map(function (fav, index) {
		var yearStr = fav.Year;
		var genreStr = fav.Genre;

		$scope.years = $scope.years.concat(yearStr.match(/\d{4}/g));
		$scope.genres = $scope.genres.concat(genreStr.match(/[\w-]+/g));
	});

	$scope.years = $scope.years.filter(function (v, i, a) {
		return a.indexOf(v) === i;
	});

	$scope.years = $scope.years.sort(function (a, b) {
		return b - a;
	});

	$scope.genres = $scope.genres.filter(function (v, i, a) {
		return a.indexOf(v) === i;
	});

	$scope.genres = $scope.genres.sort();
}).filter('yearFilter', function () {

	return function (favs, args) {

		if (args) {
			var year = args;
			var filtered = [];

			var filter = favs.map(function (fav) {
				var str = fav.Year;
				fav.matchYear = str.match(/\d{4}/g);
				return fav;
			}).filter(function (fav) {
				fav.matchYear.filter(function (y) {
					if (y === year) {
						filtered.push(fav);
						return fav;
					}
				});
			});

			return filtered;
		}

		return favs;
	};
}).filter('genreFilter', function () {

	return function (favs, args) {
		// 
		if (args) {
			var genre = args;
			var filtered = [];

			var filter = favs.map(function (fav) {
				var str = fav.Genre;
				fav.matchGenre = str.match(/[\w-]+/g);
				return fav;
			}).filter(function (fav) {
				fav.matchGenre.filter(function (g) {
					if (g === genre) {
						filtered.push(fav);
						return fav;
					}
				});
			});

			return filtered;
		}

		return favs;
	};
}).filter('ratingFilter', function () {

	return function (favs, args) {

		if (args) {
			var rating = args;
			var filtered = [];

			var filter = favs.filter(function (fav) {
				if (parseFloat(rating) === parseFloat(fav.imdbRating)) {
					filtered.push(fav);
					return fav;
				}
			});

			return filtered;
		}

		return favs;
	};
});
angular.module('webAppNetflix').config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider.state('favorites', {
		url: '/favorites',
		templateUrl: 'components/favorites/favorites.html',
		controller: 'favoritesCtrl'
	});
});
angular.module('webAppNetflix').controller('mainCtrl', function ($scope, mainService, storageUtils) {

	$scope.title = null;
	$scope.film;

	$scope.getFilm = function (title) {
		return mainService.getFilms(title).then(function (res) {
			if (res.data.Response !== 'True') {
				$scope.title = null;
			} else {
				$scope.title = res.data;
			}
		}).catch($scope.title = null);
	};

	$scope.addToFavorite = function (movie) {
		var fav = storageUtils.getItem('favorites') || [];

		if (fav.length === 0) {

			fav.push(movie);
			storageUtils.setItem('favorites', fav);
		} else {

			if (IsIdInArray(fav, movie.imdbID) === false) {
				fav.push(movie);
				storageUtils.setItem('favorites', fav);
			}
		}
	};

	function IsIdInArray(array, id) {
		var isTrue = false;

		array.forEach(function (item) {
			if (item.imdbID === id) {
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
			url: 'http://www.omdbapi.com/?t=' + title,
			method: 'GET'
		};

		$http(req).then(function (res) {

			if (res.data.Response === 'True') {
				q.resolve(res);
			} else {
				q.reject(res.data.Response);
			}
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
}).directive('errSrc', function () {
	return {
		link: function link(scope, element, attrs) {
			element.bind('error', function () {
				if (attrs.src != attrs.errSrc) {
					attrs.$set('src', attrs.errSrc);
				}
			});
		}
	};
});