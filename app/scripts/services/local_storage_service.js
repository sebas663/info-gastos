'use strict';

App.factory('LocalStorageService', ['$http', '$q', '$log', function($http, $q, $log){
  var oriTicket = {id:null,companyID:null,buyDate:new Date(),total:null,buys:[],boxDiscounts:[],creditCardDiscounts:[]};
  function fetchTicket(){
    return getPromise(oriTicket);
  }
  function addBuyToTicket(buy,ticket){
    buy.amount = buy.quantity * buy.price;
    buy.index = ticket.buys.length;
    ticket.buys.push(buy);
    ticket.subtotal = getSubtotal(ticket.buys);
    ticket.total = getTotal(ticket);
    return getPromise(ticket);
  }
  function updateBuyInTicket(buy,ticket){
    buy.amount = buy.quantity * buy.price;
    ticket.buys = updateObjectByIndex(buy,ticket.buys);
    ticket.subtotal = getSubtotal(ticket.buys);
    ticket.total = getTotal(ticket);
    return getPromise(ticket);
  }
  function deleteBuyInTicket(index,ticket){
    ticket.buys.splice(index, 1);
    ticket.subtotal = getSubtotal(ticket.buys);
    ticket.total = getTotal(ticket);
    return getPromise(ticket);
  }
  function addBoxDiscountToTicket(boxDiscount,ticket){
    boxDiscount.index = ticket.boxDiscounts.length;
    ticket.boxDiscounts.push(boxDiscount);
    ticket.subtotalBoxDiscount = getSubtotal(ticket.boxDiscounts);
    ticket.total = getTotal(ticket);
    return getPromise(ticket);
  }
  function updateBoxDiscountInTicket(boxDiscount,ticket){
    ticket.boxDiscounts = updateObjectByIndex(boxDiscount,ticket.boxDiscounts);
    ticket.subtotalBoxDiscount = getSubtotal(ticket.boxDiscounts);
    ticket.total = getTotal(ticket);
    return getPromise(ticket);
  }
  function deleteBoxDiscountInTicket(index,ticket){
    ticket.boxDiscounts.splice(index, 1);
    ticket.subtotalBoxDiscount = getSubtotal(ticket.boxDiscounts);
    ticket.total = getTotal(ticket);
    return getPromise(ticket);
  }
  function addCreditCardDiscountToTicket(creditCardDiscount,ticket){
    creditCardDiscount.index = ticket.creditCardDiscounts.length;
    ticket.creditCardDiscounts.push(creditCardDiscount);
    ticket.subtotalCreditCardDiscount = getSubtotal(ticket.creditCardDiscounts);
    ticket.total = getTotal(ticket);
    return getPromise(ticket);
  }
  function updateCreditCardDiscountInTicket(creditCardDiscount,ticket){
    ticket.creditCardDiscounts = updateObjectByIndex(creditCardDiscount,ticket.creditCardDiscounts);
    ticket.subtotalCreditCardDiscount = getSubtotal(ticket.creditCardDiscounts);
    ticket.total = getTotal(ticket);
    return getPromise(ticket);
  }
  function deleteCreditCardDiscountInTicket(index, ticket){
    ticket.creditCardDiscounts.splice(index, 1);
    ticket.subtotalCreditCardDiscount = getSubtotal(ticket.creditCardDiscounts);
    ticket.total = getTotal(ticket);
    return getPromise(ticket);
  }
  function updateObjectByIndex (obj,array){
    if(array) {
      angular.forEach(array, function(value, key) {
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
  function getSubtotal(array) {
      var subtotal = 0;
      angular.forEach(array, function(value, key) {
        subtotal += value.amount;
      });
      return subtotal;
  }
  function getTotal(ticket) {
    var total = ticket.subtotal;
    if(ticket.subtotalBoxDiscount){
      total = ticket.subtotal - ticket.subtotalBoxDiscount;
    }
    return total;
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
                return response;
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
                return response;
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
                return response;
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
                return response;
              },
              function(errResponse){
                console.error('Error while deleting CreditCardDiscount');
                return $q.reject(errResponse);
              }
            );
        }
  };

}]);
