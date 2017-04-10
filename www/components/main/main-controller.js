angular.module('webAppNetflix')

.controller('mainCtrl', function($scope, mainService, storageUtils){

	$scope.title = []
	$scope.film 

	$scope.getFilm = function(title) {
		return mainService.getFilms(title)
		.then(res => {
			$scope.title = res.data
			var fav = storageUtils.getItem('favorites') || []

			if(fav.length === 0) {

				fav.push(res.data)
				storageUtils.setItem('favorites', fav)

			} else {

				if(IsIdInArray(fav, res.data.show_id) === false) {
					fav.push(res.data)
					storageUtils.setItem('favorites', fav)							
				}
		
			}

		})
		.catch($scope.titles = [])

	}

	function IsIdInArray(array, id) {
		var isTrue = false

	  array.forEach(item => {
	  	if(item.show_id === id) {
	  		isTrue = true
	  	}
	  })

	  return isTrue
	}


})