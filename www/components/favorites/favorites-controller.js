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
	    	let year = args 
	        let filtered = [];
	        
	        var filter = favs
	        .map(fav => {
	        	let str = fav.Year
	        	fav.matchYear = str.match(/\d{4}/g)
	        	return fav
	        }) 
	        .filter(fav => {
	        	fav.matchYear
	        	.filter(y => {        		
	        		if(y === year) {
	        			filtered.push(fav)
	        			return fav
	        		}
	        	})
	        })

	        return filtered    		
    	}

    	return favs
    }

})


.filter('genreFilter', () => {

    return (favs, args) => {
        // 
        if (args) {
	    	let genre = args
	        let filtered = [];
	        
	        var filter = favs
	        .map(fav => {
	        	let str = fav.Genre
	        	fav.matchGenre = str.match(/[\w-]+/g)
	        	return fav
	        }) 
	        .filter(fav => {
	        	fav.matchGenre
	        	.filter(g => {
	        		if(g === genre) {
	        			filtered.push(fav)
	        			return fav
	        		}
	        	})
	        })
	        
	        return filtered
        }	

        return favs

    }

})

.filter('ratingFilter', () => {


    return (favs, args) => {
        
        if (args) {
	    	let rating = args
	        let filtered = [];
	        
	        var filter = favs
	        .filter(fav => {
        		if(parseFloat(rating) === parseFloat(fav.imdbRating)) {
        			filtered.push(fav)
        			return fav
        		}	        	
	        })
	        
	        return filtered
        }	

        return favs

    }

})