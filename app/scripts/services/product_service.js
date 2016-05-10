'use strict';

App.factory('ProductService', ['$http', '$q', function($http, $q){
	return {

			fetchAll: function() {
					return $http.get(url + '/Product/getAll/')
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
        return $http.post(url + '/Product/create/', obj)
            .then(
                function(response){
                  return response.data;
                },
                function(errResponse){
                  console.error('Error while creating Product');
                  return $q.reject(errResponse);
                }
            );
      },

      update: function(obj, id){
					return $http.put(url + '/Product/update/' + id, obj)
							.then(
									function(response){
										return response.data;
									},
									function(errResponse){
										console.error('Error while updating Product');
										return $q.reject(errResponse);
									}
							);
			},

			delete: function(id){
					return $http.delete( url + '/Product/delete/'+id)
							.then(
									function(response){
										return response.data;
									},
									function(errResponse){
										console.error('Error while deleting Product');
										return $q.reject(errResponse);
									}
							);
			}

	};

}]);
