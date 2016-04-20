'use strict';

App.controller('AddBuyController', AddBuyController);
App.controller('CompanyCtrl', CompanyCtrl);
App.controller('ProductCtrl', ProductCtrl);
App.controller('ModalCompanyCtrl',ModalCompanyCtrl);
App.controller('ModalProductCtrl',ModalProductCtrl);

function AddBuyController ($scope,AddBuyService){

		  var self = this;
          self.buy={id:null,companyID:null,productID:null,external_code:'',quantity:null,price:null,buyDate:null,total:null};
          self.buys=[];
          self.companies=[];
          self.products=[];
          self.buy.buyDate = new Date();
          self.resetAutocomplete = false;
          self.fetchAll = function(){
             AddBuyService.fetchAll()
                 .then(
      					       function(d) {
      						        self.buys = d;
      					       },
            					function(errResponse){
            						console.error(errResponse);
            					}
      			       );
          };

          self.createBuy = function(buy){
              AddBuyService.createBuy(buy)
		              .then(
                      self.fetchAll,
				              function(errResponse){
					               console.error('Error while creating Buy.');
				              }
                  );
          };

         self.updateBuy = function(buy, id){
              AddBuyService.updateBuy(buy, id)
		              .then(
				              self.fetchAll,
				              function(errResponse){
					               console.error('Error while updating Buy.');
				              }
                  );
          };

         self.deleteBuy = function(id){
              AddBuyService.deleteBuy(id)
		              .then(
				              self.fetchAll,
				              function(errResponse){
					               console.error('Error while deleting Buy.');
				              }
                  );
          };

          self.fetchAll();

          self.getTotal = function(){
            var total = 0;
            for(var i = 0; i < self.buys.length; i++){
              var buy = self.buys[i];
              total += buy.total;
            }
            return total;
          }

          self.submit = function() {
              if(self.buy.id==null){
     //             console.log('Saving New buy', self.buy);
                  self.createBuy(self.buy);
              }else{
                  self.updateBuy(self.buy, self.buy.id);
//                  console.log('User updated with id ', self.user.id);
              }
              self.reset();
          };
          self.submitBuys = function() {

          };

          self.edit = function(id){
//              console.log('id to be edited', id);
              for(var i = 0; i < self.buys.length; i++){
                  if(self.buys[i].id == id) {
                     self.buy = angular.copy(self.buys[i]);
                     self.buy.buyDate = new Date(self.buy.buyDate);
                     $scope.$broadcast('onEdit', {buy:self.buy});
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
        	  self.buy={id:null,companyID:null,productID:null,external_code:'',quantity:null,price:null,buyDate:null,total:null};
            $scope.myForm.$setPristine(); //reset Form
            self.buy.buyDate = new Date();
            $scope.$broadcast('onSubmit', {resetAutocomplete:true});
          };
          $scope.populateCompanies= function(array){
            self.companies = array;
          }
          $scope.populateProducts = function(array){
            self.products = array;
          }
          self.getCompanyById = function(id){
            var company = null;
            for(var i = 0; i < self.companies.length; i++){
              if(self.companies[i].id == id) {
                company = self.companies[i];
              }
            }
            return company;
          };

          self.getProductById = function(id){
            var product = null;
            for(var i = 0; i < self.products.length; i++){
              if(self.products[i].id == id) {
                product = self.products[i];
              }
            }
            return product;
          };
//      }]);
       }

function CompanyCtrl ($scope, CompanyService, $timeout, $q, $log, $filter) {
    var self = this;
    self.simulateQuery = false;
    self.isDisabled    = false;

    // list of `state` value/display objects
    self.states = [];
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;

    // ******************************
    // Internal methods
    // ******************************
    self.fetchAll = function(){
      CompanyService.fetchAll()
        .then(
          function(d) {
            self.states = d;

          },
          function(errResponse){
            console.error(errResponse);
          }
        );
    };
    self.fetchAllPopulate = function(){
      CompanyService.fetchAll()
        .then(
          function(d) {
            $scope.populateCompanies(d);
          },
          function(errResponse){
            console.error(errResponse);
          }
        );
    };
    self.states = self.fetchAll();
    self.fetchAllPopulate();
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
      if (item && item.id) {
         $scope.ctrl.buy.companyID = item.id;
        //$log.info('item ' + item);
        //$log.info('item.id ' + item.id);
        //$log.info('$scope ' + $scope);
        //$log.info('$scope.ctrl' + $scope.ctrl);
        //$log.info('$scope.ctrl.buy ' + $scope.ctrl.buy);
        //$log.info('$scope.ctrl.buy.companyID' + $scope.ctrl.buy.companyID);
      }
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
    $scope.$on('onSubmit', function(event, obj) {
      if(obj.resetAutocomplete){
        clear();
      }
    })
    $scope.$on('onEdit', function(event, obj) {
      if(obj.buy){
        setDefaults(obj.buy.companyID);
      }
    })
    function clear() {
      self.selectedItem = null;
      self.searchText = "";
    }
    function setDefaults(objectID) {
        var result = $filter('filter')(self.states, {id: objectID})[0];
        if (result) {
          self.selectedItem = result.description;
          self.searchText = result.description;
        }
    }
  }
function ProductCtrl ($scope, $mdDialog, ProductService, $timeout, $q, $log, $filter,$state) {
    var self = this;
    $scope.product = {id:null,description:''};
    self.simulateQuery = false;
    self.isDisabled    = false;

    // list of `state` value/display objects
    self.states        = [];
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;

    // ******************************
    // Internal methods
    // ******************************
    self.fetchAll = function(){
      ProductService.fetchAll()
        .then(
          function(d) {
            self.states = d;
           // alert("inside fetch")
          },
          function(errResponse){
            console.error(errResponse);
          }
        );
    };
    self.fetchAllPopulate = function(){
      ProductService.fetchAll()
        .then(
          function(d) {
            $scope.populateProducts(d);
          },
          function(errResponse){
            console.error(errResponse);
          }
        );
    };
    self.fetchAll();
    self.fetchAllPopulate();

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      $log.info('querySearch ' );
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
      $log.info('selectedItemChange ' );
      if (item && item.id) {
         $scope.ctrl.buy.productID = item.id;
       // $log.info('Id ' + $scope.ctrl.buy.productID);
      }
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      $log.info('createFilterFor ' );
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return (state.id.indexOf(lowercaseQuery) === 0);
      };

    }
    $scope.$on('onSubmit', function(event, obj) {
      if(obj.resetAutocomplete){
        clear();
      }
    })
    $scope.$on('onEdit', function(event, obj) {
      if(obj.buy){
        setDefaults(obj.buy.productID)
      }
    })
    function clear() {
      self.selectedItem = null;
      self.searchText = "";
    }
    function setDefaults(objectID) {
        var result = $filter('filter')(self.states, {id: objectID})[0];
        if (result) {
          self.selectedItem = result.description;
          self.searchText = result.description;
        }
    }
    $scope.closeDialog = function() {
      $mdDialog.hide();
    }
    $scope.create = function(product){
      ProductService.create(product)
        .then(
          function(d) {
           // self.states = d;
            //self.fetchAll();
           // alert("paso create")
          },
          function(errResponse){
            console.error(errResponse);
          }
        );
    };
    $scope.submit = function() {
      if($scope.product.id==null){
        //             console.log('Saving New buy', self.buy);
        $scope.create($scope.product);
      }
  //       else{
  //         self.update(self.buy, self.buy.id);
  //        console.log('User updated with id ', self.user.id);
  //        }
      $mdDialog.hide();
      //self.reset();
     
      //alert("paso bubmit")
    };
  }

function ModalCompanyCtrl($scope, $mdDialog) {
  $scope.showDialog = showDialog;
  function showDialog($event) {
    var parentEl = angular.element(document.body);
    $mdDialog.show({
      targetEvent: $event,
      parent: parentEl,
      templateUrl:'views/directives-templates/formNewCompany.html',
      locals: {
        items: $scope.states
      },
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
function ModalProductCtrl($scope, $mdDialog, ProductService) {
  $scope.showDialog = showDialog;
  $scope.product = {id:null,description:''};
  function showDialog($event) {
    var parentEl = angular.element(document.body);
    $mdDialog.show({
      targetEvent: $event,
      parent: parentEl,
      scope: $scope,        // use parent scope in template
      preserveScope: true,
    //  onComplete: $scope.fetchAll,
      templateUrl:'views/directives-templates/formNewProduct.html',
      //locals: {
       // items: $scope.states
      //},
      controller: ProductCtrl
    });
    // When the 'enter' animation finishes...
    //function callParent($scope) {
     //    $scope.callFetchAll;
    //}
    function DialogController($scope, $mdDialog, ProductService) {
      $scope.closeDialog = function() {
        $mdDialog.hide();
      }
      $scope.create = function(product){
        ProductService.create(product)
            .then(
                function(d) {
                  $scope.states = d;
                },
                function(errResponse){
                  console.error(errResponse);
                }
             );
      };
      $scope.submit = function() {
        if($scope.product.id==null){
          //             console.log('Saving New buy', self.buy);
          $scope.create($scope.product);
        }
//       else{
//         self.update(self.buy, self.buy.id);
//        console.log('User updated with id ', self.user.id);
//        }
        $mdDialog.hide();
        //self.reset();
      };

    }
  }
}
