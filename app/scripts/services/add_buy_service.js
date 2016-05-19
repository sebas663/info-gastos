'use strict';

App.factory('BuyService', ['$http', '$q', '$log', function($http, $q, $log){
	return {
        saveTicket: function(ticket){
          console.log(angular.toJson(ticket));
          return $http.post( url + '/Ticket/save/' , angular.toJson(ticket))
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
