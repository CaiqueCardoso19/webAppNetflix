angular.module('webAppNetflix')

.controller('mainCtrl', function($scope, mainService, storageUtils){

	$scope.title = null
	$scope.film 

	$scope.getFilm = function(title) {
		return mainService.getFilms(title)
		.then(res => {
			if(res.data.Response !== 'True') {
				$scope.title = null
			} else {
				$scope.title = res.data
			}
		})
		.catch($scope.title = null)

	}

	$scope.addToFavorite = (movie) => {
		var fav = storageUtils.getItem('favorites') || []

		if(fav.length === 0) {

			fav.push(movie)
			storageUtils.setItem('favorites', fav)

		} else {

			if(IsIdInArray(fav, movie.imdbID) === false) {
				fav.push(movie)
				storageUtils.setItem('favorites', fav)							
			}
		}

	}

	function IsIdInArray(array, id) {
		var isTrue = false

	  array.forEach(item => {
	  	if(item.imdbID === id) {
	  		isTrue = true
	  	}
	  })

	  return isTrue
	}


})