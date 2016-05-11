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
        saveTicket: function(ticket){
          return $http.post( url + '/Buy/save/' , angular.toJson(ticket))
            .then(
              function(response){
                return response.data;
              },
              function(errResponse){
                console.error('Error while saving ticket');
                return $q.reject(errResponse);
              }
            );
        }
	};

}]);
