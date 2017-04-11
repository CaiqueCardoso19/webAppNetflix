angular.module('webAppNetflix')

.controller('mainCtrl', ($scope, mainService, storageUtils) => {

	$scope.title = null
	$scope.film
    $scope.showModal = false;
    $scope.buttonClicked = "";
    console.log($scope)	

	$scope.getFilms = title => {
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

    $scope.toggleModal = function(btnClicked){
    	debugger
        $scope.buttonClicked = btnClicked;
        $scope.showModal = !$scope.showModal;
    };

	const IsIdInArray = (array, id) => {
		var isTrue = false

	  array.forEach(item => {
	  	if(item.imdbID === id) {
	  		isTrue = true
	  	}
	  })

	  return isTrue
	}
	
})