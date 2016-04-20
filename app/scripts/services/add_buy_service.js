'use strict';

App.factory('AddBuyService', ['$http', '$q', function($http, $q){
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
										console.error('Error while creating buy');
										return $q.reject(errResponse);
									}
							);
		    },

		    updateBuy: function(buy, id){
					return $http.put(url + '/addBuy/update/' + id, buy)
							.then(
									function(response){
										return response.data;
									},
									function(errResponse){
										console.error('Error while updating buy');
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
										console.error('Error while deleting buy');
										return $q.reject(errResponse);
									}
							);
			}

	};

}]);
