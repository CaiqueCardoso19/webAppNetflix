angular.module('webAppNetflix')

.service('mainService', ($http, $q) => {
	return {
		getFilms: getFilms
	}

	function getFilms(title) {
		var req = {
			url: `http://www.omdbapi.com/?t=${title}`,
			method: 'GET'
		}

		return $http(req)
		.then(res => res.data)
		.catch(err => err)

	}
})