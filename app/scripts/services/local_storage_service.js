'use strict';

App.factory('LocalStorageService', ['$http', '$q', '$log', function($http, $q, $log){
  var oriTicket = {id:null,companyID:null,buyDate:new Date(),total:null,buys:[],boxDiscounts:[],creditCardDiscounts:[]};
  function fetchTicket(){
    // console.log("ticket oriTicket" + angular.toJson(oriTicket));
    return getPromise(oriTicket);
  }
  function addBuyToTicket(buy,ticket){
    // console.log("buy " + angular.toJson(buy));
    // console.log("ticket " + angular.toJson(ticket));
    // console.log("ticket.buys" + ticket.buys);
    buy.total = buy.quantity * buy.price;
    buy.index = ticket.buys.length;
    // console.log("buy.index " + buy.index);
    ticket.buys.push(buy);
    // console.log("ticket.buys[0]" + angular.toJson(ticket.buys[0]));
    return getPromise(ticket);
  }
  function updateBuyInTicket(buy,ticket){
    buy.total = buy.quantity * buy.price;
    ticket.buys = updateObjectByIndex(buy,ticket.buys);
    return getPromise(ticket);
  }
  function deleteBuyInTicket(index,ticket){
    ticket.buys.splice(index, 1);
    return getPromise(ticket);
  }
  function addBoxDiscountToTicket(boxDiscount,ticket){
    ticket.boxDiscounts.push(boxDiscount);
    return getPromise(ticket);
  }
  function updateBoxDiscountInTicket(boxDiscount,ticket){
    ticket.boxDiscounts = updateObjectByIndex(boxDiscount,ticket.boxDiscounts);
    return getPromise(ticket);
  }
  function deleteBoxDiscountInTicket(index,ticket){
    ticket.boxDiscounts.splice(index, 1);
    return getPromise(ticket);
  }
  function addCreditCardDiscountToTicket(creditCardDiscount,ticket){
    ticket.creditCardDiscounts.push(creditCardDiscount);
    return getPromise(ticket);
  }
  function updateCreditCardDiscountInTicket(creditCardDiscount,ticket){
    ticket.creditCardDiscounts = updateObjectByIndex(creditCardDiscount,ticket.creditCardDiscounts);
    return getPromise(ticket);
  }
  function deleteCreditCardDiscountInTicket(index, ticket){
    ticket.creditCardDiscounts.splice(index, 1);
    return getPromise(ticket);
  }
  function getObjectById (id,array){
    var obj = null;
    if(array) {
      for (var i = 0; i < array.length; i++) {

        if (array[i].id == id) {
          obj = array[i];
        }
      }
    }
    return obj;
  }
  function updateObjectByIndex (obj,array){
    // console.log("obj " + angular.toJson(obj));
    if(array) {
      angular.forEach(array, function(value, key) {
        // console.log("obj.index " + obj.index);
        // console.log("key " + key);
         if(angular.equals(key, obj.index)){
           array[key] = obj;
         }
      });
    }
    return array;
  }
  function getPromise(ticket){
    var deferred = $q.defer();
    oriTicket = angular.copy(ticket);
    deferred.resolve(oriTicket);
    return deferred.promise;
  }
	return {
        fetchTicket: function() {
          return fetchTicket()
                .then(
                    function(response){
                      // console.log("response" + angular.toJson(response));
                      // console.log("response.data" + angular.toJson(response.data));
                      return response;
                    },
                    function(errResponse){
                      console.error(errResponse);
                      return $q.reject(errResponse);
                    }
                );
        },

        addBuyToTicket: function(buy,ticket){
					return addBuyToTicket(buy,ticket)
							.then(
									function(response){
										return response.data;
									},
									function(errResponse){
										console.error('Error while creating Buy');
										return $q.reject(errResponse);
									}
							);
		    },

        updateBuyInTicket: function(buy, ticket){
					return updateBuyInTicket(buy, ticket)
							.then(
									function(response){
										return response;
									},
									function(errResponse){
										console.error('Error while updating Buy');
										return $q.reject(errResponse);
									}
							);
			  },

        deleteBuyInTicket: function(index,ticket){
            return deleteBuyInTicket(index, ticket)
                .then(
                    function(response){
                      return response;
                    },
                    function(errResponse){
                      console.error('Error while deleting Buy');
                      return $q.reject(errResponse);
                    }
                );
        },
        addBoxDiscountToTicket: function(boxDiscount,ticket){
          return addBoxDiscountToTicket(boxDiscount,ticket)
            .then(
              function(response){
                return response.data;
              },
              function(errResponse){
                console.error('Error while creating BoxDiscount');
                return $q.reject(errResponse);
              }
            );
        },

        updateBoxDiscountInTicket: function(boxDiscount,ticket){
          return updateBoxDiscountInTicket(boxDiscount,ticket)
            .then(
              function(response){
                return response.data;
              },
              function(errResponse){
                console.error('Error while updating BoxDiscount');
                return $q.reject(errResponse);
              }
            );
        },

        deleteBoxDiscountInTicket: function(index,ticket){
          return deleteBoxDiscountInTicket(index, ticket)
            .then(
              function(response){
                return response.data;
              },
              function(errResponse){
                console.error('Error while deleting BoxDiscount');
                return $q.reject(errResponse);
              }
            );
        },
        addCreditCardDiscountToTicket: function(creditCardDiscount,ticket){
          return addCreditCardDiscountToTicket(creditCardDiscount,ticket)
            .then(
              function(response){
                return response.data;
              },
              function(errResponse){
                console.error('Error while creating CreditCardDiscount');
                return $q.reject(errResponse);
              }
            );
        },

        updateCreditCardDiscountInTicket: function(creditCardDiscount,ticket){
          return updateCreditCardDiscountInTicket(creditCardDiscount,ticket)
            .then(
              function(response){
                return response.data;
              },
              function(errResponse){
                console.error('Error while updating CreditCardDiscount');
                return $q.reject(errResponse);
              }
            );
        },

        deleteCreditCardDiscountInTicket: function(index,ticket){
          return deleteCreditCardDiscountInTicket(index, ticket)
            .then(
              function(response){
                return response.data;
              },
              function(errResponse){
                console.error('Error while deleting CreditCardDiscount');
                return $q.reject(errResponse);
              }
            );
        }
  };

}]);
