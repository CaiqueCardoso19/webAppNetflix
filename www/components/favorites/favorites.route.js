angular.module('webAppNetflix')

.config(($stateProvider, $urlRouterProvider) => {
	$stateProvider
	  .state ('favorites', {
	    url: '/favorites',
	    templateUrl: 'components/favorites/favorites.html', 
	    controller: 'favoritesCtrl'
	  })
}) 