'use strict';

App.factory('ProductService', ['$http', '$q', function($http, $q){
	//var url = "http://localhost:8081/control-gastos";
  var url = "http://172.16.4.147:8081/control-gastos";
	return {

			fetchAll: function() {
					return $http.get(url + '/product/getAll/')
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
        return $http.post(url + '/product/create/', obj)
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
					return $http.put(url + '/product/update/' + id, obj)
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
					return $http.delete( url + '/product/delete/'+id)
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
