angular.module('webAppNetflix')

.config(($stateProvider, $urlRouterProvider) => {
	$stateProvider
	  .state ('main', {
	    url: '/main',
	    templateUrl: 'components/main/main.html', 
	    controller: 'mainCtrl'
	  })
}) 