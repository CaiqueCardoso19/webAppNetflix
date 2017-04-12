angular.module('webAppNetflix')

.service('mainService', ($http, $q) => {
	return {
		getFilms: getFilms
	}

	function getFilms(title) {
		var q = $q.defer()
		var req = {
		url: `http://www.omdbapi.com/?t=${title}`,
		method: 'GET'
		}

		$http(req)
		.then(res => {

			if(res.data.Response === 'True') {
				q.resolve(res)
			} else {
				q.reject(res.data.Response)
			}

		})
		.catch(err => q.reject(err))

		return q.promise
	}


})