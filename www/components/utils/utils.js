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

.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  }
})

.directive('modal', function () {
  return {
    template: 
    `<div class="modal fade">
        <div class="modal-dialog">
            <div class="alert alert-success">
              <strong>Success!</strong> The movie was added.
            </div>
        </div>
      </div>`,
    restrict: 'E',
    transclude: true,
    replace:true,
    scope:true,
    link: function postLink(scope, element, attrs) {
      
        scope.$watch(attrs.visible, function(value){
        if(value == true)
          $(element).modal('show');
        else
          $(element).modal('hide');
      });

      $(element).on('shown.bs.modal', function(){
        scope.$apply(function(){
          scope.$parent[attrs.visible] = true;
        });
      });

      $(element).on('hidden.bs.modal', function(){
        scope.$apply(function(){
          scope.$parent[attrs.visible] = false;
        });
      });
    }
  };
});