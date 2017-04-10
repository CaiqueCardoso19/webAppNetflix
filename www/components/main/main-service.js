angular.module('webAppNetflix')

.service('mainService', ($http, $q) => {
	return {
		getFilms: getFilms
	}

	function getFilms(title) {
		var q = $q.defer()
		var req = {
			url: `http://netflixroulette.net/api/api.php?title=${title}`,
			method: 'GET'
		}

		$http(req)
		.then(res => q.resolve(res))
		.catch(err => q.reject(err))

		return q.promise
	}
})