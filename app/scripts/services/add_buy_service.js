'use strict';

App.factory('BuyService', ['$http', '$q', '$log', function($http, $q, $log){
	return {
        fetchAll: function() {
             return $http.get(url + '/Buy/getAll/')
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
					return $http.post(url + '/Buy/add/', buy)
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
        BuyToList: function(buy){
          oriTicket.buys.push(buy);
          return oriTicket;
        },

		    updateBuy: function(buy, id){
					return $http.put(url + '/Buy/update/' + id, buy)
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
					return $http.delete( url + '/Buy/delete/'+id)
							.then(
									function(response){
										return response.data;
									},
									function(errResponse){
										console.error('Error while deleting buy');
										return $q.reject(errResponse);
									}
							);
			},

      saveBuys: function(buys){
        return $http.post( url + '/Buy/save/' , angular.toJson(buys))
          .then(
            function(response){
              return response.data;
            },
            function(errResponse){
              console.error('Error while saving buys');
              return $q.reject(errResponse);
            }
          );
      }

	};

}]);
