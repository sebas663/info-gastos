'use strict';

//App.controller('AddBuyController', ['$scope','$timeout', '$q', '$log','AddBuyService',function($scope,$timeout, $q, $log ,AddBuyService) {

App.controller('AddBuyController', AddBuyController);
App.controller('CompanyCtrl', CompanyCtrl);
App.controller('ProductCtrl', ProductCtrl);
App.controller('ModalCompanyCtrl',ModalCompanyCtrl);

function AddBuyController ($scope,AddBuyService){

		  var self = this;
          self.buy={id:null,company:'',product:'',external_code:'',quantity:0,price:0};
          self.buys=[];

          self.fetchAll = function(){
//              AddBuyService.fetchAll()
//                  .then(
//      					       function(d) {
//      						        self.buys = d;
//      					       },
//            					function(errResponse){
//            						console.error('Error while fetching Currencies');
//            					}
//      			       );
          };

          self.createBuy = function(buy){
              AddBuyService.createBuy(buy)
		              .then(
                      self.fetchAll,
				              function(errResponse){
					               console.error('Error while creating User.');
				              }
                  );
          };

         self.updateBuy = function(buy, id){
              AddBuyService.updateBuy(buy, id)
		              .then(
				              self.fetchAll,
				              function(errResponse){
					               console.error('Error while updating User.');
				              }
                  );
          };

         self.deleteBuy = function(id){
              AddBuyService.deleteBuy(id)
		              .then(
				              self.fetchAll,
				              function(errResponse){
					               console.error('Error while deleting User.');
				              }
                  );
          };

          self.fetchAll();

          self.submit = function() {
              if(self.buy.id==null){
//                  console.log('Saving New User', self.user);
                  self.createBuy(self.buy);
              }else{
                  self.updateBuy(self.buy, self.buy.id);
//                  console.log('User updated with id ', self.user.id);
              }
              self.reset();
          };

          self.edit = function(id){
//              console.log('id to be edited', id);
              for(var i = 0; i < self.buys.length; i++){
                  if(self.buys[i].id == id) {
                     self.buy = angular.copy(self.buys[i]);
                     break;
                  }
              }
          };

          self.remove = function(id){
//              console.log('id to be deleted', id);
              if(self.buy.id === id) {//clean form if the user to be deleted is shown there.
                 self.reset();
              }
              self.deleteBuy(id);
          };


          self.reset = function(){
        	  self.buy={id:null,company:'',product:'',external_code:'',quantity:0,price:0};
              $scope.myForm.$setPristine(); //reset Form
          };

//      }]);
       }

function CompanyCtrl ($timeout, $q, $log) {
    var self = this;

    self.simulateQuery = false;
    self.isDisabled    = false;

    // list of `state` value/display objects
    self.states        = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;


    self.newState = newState;

    function newState(state) {
      alert("Sorry! You'll need to create a Constituion for " + state + " first!");
    }

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function selectedItemChange(item) {
//    	var it = JSON.stringify(item);
//    	var it3 = angular.fromJson(it);
//        $log.info('Item changed to it ' + it);
//        $log.info('Item changed to it3 ' + it3.display);
//        self.id = item.id;
//        $log.info('Id ' + self.id);
      }

    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
//      var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
//              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
//              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
//              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
//              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
//              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
//              Wisconsin, Wyoming';
//
//      return allStates.split(/, +/g).map( function (state) {
//        return {
//          value: state.toLowerCase(),
//          display: state
//        };
//      });
  	  var allStates = [
  	              { display: 'Chicken', id: '7777' ,otra:'a' },
  	              { display: 'Corn', id: '9001',otra:'d' },
  	              { display: 'Cabbage', id: '6996',otra:'f' },
  	              { display: 'Chili', id: '4242',otra:'h' },
  	        	  { display: 'seba', id: '4244' ,otra:'j'},
  	        	  { display: 'Chili', id: '4245',otra:'y' },
  	        	  { display: 'Chili', id: '4246',otra:'i' },
  	        	  { display: 'Chili', id: '4247' ,otra:'k'},
  	              { display: 'Cheese', id: '1337',otra:'l' }
  	            ];
  	  return allStates;
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return (state.id.indexOf(lowercaseQuery) === 0);
      };

    }
  }
function ProductCtrl ($timeout, $q, $log) {
    var self = this;

    self.simulateQuery = false;
    self.isDisabled    = false;

    // list of `state` value/display objects
    self.states        = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;


    self.newState = newState;

    function newState(state) {
      alert("Sorry! You'll need to create a Constituion for " + state + " first!");
    }

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function selectedItemChange(item) {
//    	var it = JSON.stringify(item);
//    	var it3 = angular.fromJson(it);
//        $log.info('Item changed to it ' + it);
//        $log.info('Item changed to it3 ' + it3.display);
//        self.id = item.id;
//        $log.info('Id ' + self.id);
      }

    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
//      var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
//              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
//              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
//              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
//              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
//              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
//              Wisconsin, Wyoming';
//
//      return allStates.split(/, +/g).map( function (state) {
//        return {
//          value: state.toLowerCase(),
//          display: state
//        };
//      });
  	  var allStates = [
  	              { display: 'Chicken', id: '7777' ,otra:'a' },
  	              { display: 'Corn', id: '9001',otra:'d' },
  	              { display: 'Cabbage', id: '6996',otra:'f' },
  	              { display: 'Chili', id: '4242',otra:'h' },
  	        	  { display: 'seba', id: '4244' ,otra:'j'},
  	        	  { display: 'Chili', id: '4245',otra:'y' },
  	        	  { display: 'Chili', id: '4246',otra:'i' },
  	        	  { display: 'Chili', id: '4247' ,otra:'k'},
  	              { display: 'Cheese', id: '1337',otra:'l' }
  	            ];
  	  return allStates;
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return (state.id.indexOf(lowercaseQuery) === 0);
      };

    }
  }

function ModalCompanyCtrl($scope, $mdDialog) {
  $scope.showDialog = showDialog;
  function showDialog($event) {
    var parentEl = angular.element(document.body);
    $mdDialog.show({
      targetEvent: $event,
      parent: parentEl,
      templateUrl:'views/directives-templates/formNewCompany.html',
      controller: DialogController
    });
    function DialogController($scope, $mdDialog) {

      $scope.closeDialog = function() {
        $mdDialog.hide();
      }
      $scope.sendMail= function() {
        $mdDialog.hide();
      }
    }
  }
  }
