'use strict';

App.factory('BoxDiscountService', ['$http', '$q', function($http, $q){
	return {

			fetchAll: function() {
					return $http.get(url + '/BoxDiscount/getAll/')
							.then(
									function(response){
										return response.data;
									},
									function(errResponse){
										console.error(errResponse);
										return $q.reject(errResponse);
									}
							);
			},

      create: function(obj){
        return $http.post(url + '/BoxDiscount/create/', obj)
            .then(
                function(response){
                  return response.data;
                },
                function(errResponse){
                  console.error('Error while creating boxDiscount');
                  return $q.reject(errResponse);
                }
            );
      },

      update: function(obj, id){
					return $http.put(url + '/BoxDiscount/update/' + id, obj)
							.then(
									function(response){
										return response.data;
									},
									function(errResponse){
										console.error('Error while updating boxDiscount');
										return $q.reject(errResponse);
									}
							);
			},

			delete: function(id){
					return $http.delete( url + '/BoxDiscount/delete/'+id)
							.then(
									function(response){
										return response.data;
									},
									function(errResponse){
										console.error('Error while deleting boxDiscount');
										return $q.reject(errResponse);
									}
							);
			}

	};

}]);
