'use strict';

App.factory('CompanyService', ['$http', '$q', function($http, $q){
	return {

			fetchAll: function() {
					return $http.get(url + '/Company/getAll/')
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
        return $http.post(url + '/Company/create/', obj)
            .then(
                function(response){
                  return response.data;
                },
                function(errResponse){
                  console.error('Error while creating company');
                  return $q.reject(errResponse);
                }
            );
      },

      update: function(obj, id){
					return $http.put(url + '/Company/update/' + id, obj)
							.then(
									function(response){
										return response.data;
									},
									function(errResponse){
										console.error('Error while updating company');
										return $q.reject(errResponse);
									}
							);
			},

			delete: function(id){
					return $http.delete( url + '/Company/delete/'+id)
							.then(
									function(response){
										return response.data;
									},
									function(errResponse){
										console.error('Error while deleting company');
										return $q.reject(errResponse);
									}
							);
			}

	};

}]);
