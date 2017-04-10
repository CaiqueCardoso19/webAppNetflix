angular.module('webAppNetflix')

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	  .state ('main', {
	    url: '/main',
	    templateUrl: 'components/main/main.html', 
	    controller: 'mainCtrl'
	  })
}) 