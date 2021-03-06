'use strict';

App.factory('CreditCardDiscountService', ['$http', '$q', function($http, $q){
	return {

			fetchAll: function() {
					return $http.get(url + '/CreditCardDiscount/getAll/')
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
        return $http.post(url + '/CreditCardDiscount/create/', obj)
            .then(
                function(response){
                  return response.data;
                },
                function(errResponse){
                  console.error('Error while creating creditCardDiscount');
                  return $q.reject(errResponse);
                }
            );
      },

      update: function(obj, id){
					return $http.put(url + '/CreditCardDiscount/update/' + id, obj)
							.then(
									function(response){
										return response.data;
									},
									function(errResponse){
										console.error('Error while updating creditCardDiscount');
										return $q.reject(errResponse);
									}
							);
			},

			delete: function(id){
					return $http.delete( url + '/CreditCardDiscount/delete/'+id)
							.then(
									function(response){
										return response.data;
									},
									function(errResponse){
										console.error('Error while deleting creditCardDiscount');
										return $q.reject(errResponse);
									}
							);
			}

	};

}]);
