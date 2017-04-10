angular.module('webAppNetflix')

.controller('mainCtrl', ($scope, mainService, storageUtils) => {

	$scope.title = []
	$scope.film 

	$scope.getFilms = title => {
		return mainService.getFilms(title)
		.then(res => {
			$scope.title = res
			var fav = storageUtils.getItem('favorites') || []

			if(fav.length === 0) {
				fav.push(res)
				storageUtils.setItem('favorites', fav)
			} else {
				if(IsIdInArray(fav, res.show_id) === false) {
					fav.push(res)
					storageUtils.setItem('favorites', fav)							
				}		
			}
		})
		.catch($scope.titles = [])
	}

	const IsIdInArray = (array, id) => {
		var isTrue = false

	  array.forEach(item => {
	  	if(item.show_id === id) {
	  		isTrue = true
	  	}
	  })

	  return isTrue
	}


})