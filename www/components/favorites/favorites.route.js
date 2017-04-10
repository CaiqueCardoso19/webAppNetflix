angular.module('webAppNetflix')

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	  .state ('favorites', {
	    url: '/favorites',
	    templateUrl: 'components/favorites/favorites.html', 
	    controller: 'favoritesCtrl'
	  })
}) 