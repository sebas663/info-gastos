'use strict';

App.factory('AutocompleteService', ['$filter', '$q', '$timeout', function($filter, $q, $timeout){
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(item) {
      return (item.id.indexOf(lowercaseQuery) === 0);
    };
  }
	return {
      querySearch: function  (query,array) {
        return query ? array.filter( createFilterFor(query) ) : array;
      },
      getObjectById: function(id,array){
        var obj = null;
        for(var i = 0; i < array.length; i++){
          if(array[i].id == id) {
            obj = array[i];
          }
        }
        /*angular.forEach(array, function(value, key) {;
          if(angular.equals(id, value.id)){
             obj = array[key];
          }
        });*/
        return obj;
      }
	};

}]);
