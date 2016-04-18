'use strict';

App.factory('AddBuyService', ['$http', '$q', function($http, $q){
	var url = "http://localhost:8081/control-gastos";
	return {

			fetchAll: function() {
					return $http.get(url + '/addBuy/getAll/')
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

		    createBuy: function(buy){
					return $http.post(url + '/addBuy/add/', buy)
							.then(
									function(response){
										return response.data;
									},
									function(errResponse){
										console.error('Error while creating user');
										return $q.reject(errResponse);
									}
							);
		    },

		    updateBuy: function(user, id){
					return $http.put(url + ' /addBuy/update/' + id, user)
							.then(
									function(response){
										return response.data;
									},
									function(errResponse){
										console.error('Error while updating user');
										return $q.reject(errResponse);
									}
							);
			},

			deleteBuy: function(id){
					return $http.delete( url + '/addBuy/delete/'+id)
							.then(
									function(response){
										return response.data;
									},
									function(errResponse){
										console.error('Error while deleting user');
										return $q.reject(errResponse);
									}
							);
			}

	};

}]);
