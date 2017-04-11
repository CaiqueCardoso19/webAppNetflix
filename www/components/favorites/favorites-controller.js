angular.module('webAppNetflix')

.controller('favoritesCtrl', ($scope, mainService, storageUtils) => {
	
	$scope.favs = storageUtils.getItem('favorites') || []
	$scope.years = []
	$scope.genres = []

    $scope.favs
    .map((fav, index) => {
    	let yearStr = fav.Year
    	let genreStr = fav.Genre

    	$scope.years = $scope.years.concat(yearStr.match(/\d{4}/g))

    	if(genreStr !== 'N/A')
    		$scope.genres = $scope.genres.concat(genreStr.match(/[\w-]+/g))
    	
    })

    $scope.years = $scope.years
    .filter((v, i, a) => a.indexOf(v) === i)
	
	$scope.years = $scope.years
	.sort((a,b)=>b-a)

    $scope.genres = $scope.genres
    .filter((v, i, a) => a.indexOf(v) === i)
	
	$scope.genres = $scope.genres
	.sort()
	
})

.filter('yearFilter', () => {

    return (favs, args) => {
    	
    	if (args) {
	    	const year = args 
	        
	        var filter = favs
	        .map(fav => {
	        	const str = fav.Year
	        	fav.matchYear = str.match(/\d{4}/g)
	        	return fav
	        }) 
	        .filter(fav => fav.matchYear.indexOf(year) > -1)

	        return filter    		
    	}
		
    	return favs
    }

})


.filter('genreFilter', () => {

    return (favs, args) => {
        // 
        if (args) {
	    	const genre = args
	        
	        var filter = favs
	        .map(fav => {
	        	let str = fav.Genre
	        	fav.matchGenre = str.match(/[\w-]+/g)
	        	return fav
	        }) 
	        .filter(fav => fav.matchGenre.indexOf(genre) > -1)

	        return filter
        }	

        return favs

    }

})

.filter('ratingFilter', () => {


    return (favs, args) => {
        
        if (args) {
	    	let rating = parseFloat(args)
	        
	        var filter = favs
	        .map(fav => {
	        	fav.imdbRating = parseFloat(fav.imdbRating)
	        	return fav
	      	})
	        .filter(fav => fav.imdbRating >= rating)
	        
	        return filter
        }	

        return favs

    }

})