angular.module('webAppNetflix')

.factory('storageUtils', function (){

  return {
    getItem: function(item) {

    	return JSON.parse(window.localStorage.getItem(item))    	
    },
    setItem: function(item, data) {

			try {
			  window.localStorage.setItem(item, JSON.stringify(data))
			} catch(e) {
			  window.localStorage.setItem(item, data)
			}

    	return 
    }
  }

})