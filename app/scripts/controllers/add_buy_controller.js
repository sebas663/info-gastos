'use strict';

App.controller('AddBuyController', AddBuyController);
App.controller('CompanyCtrl', CompanyCtrl);
App.controller('ProductCtrl', ProductCtrl);
App.controller('BoxDiscountCtrl', BoxDiscountCtrl);
App.controller('CreditCardDiscountCtrl', CreditCardDiscountCtrl);


function AddBuyController ($scope,AddBuyService){

		  var self = this;
          var oriBuy = {id:null,companyID:null,productID:null,external_code:'',quantity:null,price:null,buyDate:null,total:null};
          var oriBoxDiscount = {id:null,boxDiscountID:null,quantity:null,amount:null};
          var oriCreditCardDiscount = {id:null,creditCardDiscountID:null,amount:null,base:null};
          self.buy = angular.copy(oriBuy);
          self.boxDiscount = angular.copy(oriBoxDiscount);
          self.creditCardDiscount = angular.copy(oriCreditCardDiscount);
          self.buys=[];
          self.boxDiscounts=[];
          self.creditCardDiscounts=[];
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

          self.saveBuys = function(buys){
            AddBuyService.saveBuys(buys)
              .then(
                self.fetchAll,
                function(errResponse){
                  console.error('Error while save Buys.');
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

          self.submitBuy = function() {
              if(self.buy.id==null){
     //             console.log('Saving New buy', self.buy);
                  self.createBuy(self.buy);
              }else{
                  self.updateBuy(self.buy, self.buy.id);
//                  console.log('User updated with id ', self.user.id);
              }
              self.reset();
          };
          self.submitDiscBox = function() {
            if(self.buy.id==null){
              //             console.log('Saving New buy', self.buy);
              self.createBuy(self.buy);
            }else{
              self.updateBuy(self.buy, self.buy.id);
        //                  console.log('User updated with id ', self.user.id);
            }
            self.reset();
          };
          self.submitDiscCreditCard = function() {
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
            if( self.buys.length > 0 ){
              //             console.log('Saving New buy', self.buy);
              self.saveBuys(self.buys);
            }else{

//                  console.log('User updated with id ', self.user.id);
            }
            self.reset();

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

          self.reset = function(type){
            if(type == 'buyForm'){
              $scope.buyForm.$setPristine(); //reset Form
              self.buy = angular.copy(oriBuy);
              self.buy.buyDate = new Date();
              $scope.$broadcast('onSubmitBuy', {resetAutocomplete:true});
            }
            else if (type == 'creditCardForm'){
              $scope.creditCardForm.$setPristine(); //reset Form
              self.creditCardDiscount = angular.copy(oriCreditCardDiscount);
              $scope.$broadcast('onSubmitCreditCard', {resetAutocomplete:true});
            }
            else if (type == 'discBoxForm'){
              $scope.discBoxForm.$setPristine(); //reset Form
              self.boxDiscount = angular.copy(oriBoxDiscount);
              $scope.$broadcast('onSubmitBox', {resetAutocomplete:true});
            }

          };

          $scope.populateArray = function(array,type){
            if(type == 'company'){
              self.companies = array;
            }
            else if (type == 'product'){
              self.products = array;
            }
            else if (type == 'boxDiscount'){
              self.boxDiscounts = array;
            }
            else if (type == 'creditCardDiscount'){
              self.creditCardDiscounts = array;
            }
          }

          self.getObjectById = function(id,array){
            var obj = null;
            for(var i = 0; i < array.length; i++){
              if(array[i].id == id) {
                obj = array[i];
              }
            }
            return obj;
          };
//      }]);
}

function CompanyCtrl ($scope, CompanyService, $timeout, $q, $log, $filter,$mdDialog) {
    var self = this;
    self.simulateQuery = false;
    self.isDisabled    = false;
    self.companies = [];
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    $scope.company = {id:null,description:'',entry:'',code:'',subsidiary:'',address:''};
    $scope.showDialog = showDialog;

    // ******************************
    // Internal methods
    // ******************************
    self.fetchAll = function(){
      CompanyService.fetchAll()
        .then(
          function(d) {
            self.companies = d;
           // $log.info('fetchAll company' );
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
            $scope.populateArray(d,'company');
          },
          function(errResponse){
            console.error(errResponse);
          }
        );
    };
    self.companies = self.fetchAll();
    self.fetchAllPopulate();
    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? self.companies.filter( createFilterFor(query) ) : self.companies,
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
      }
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(company) {
        return (company.id.indexOf(lowercaseQuery) === 0);
      };

    }
    $scope.$on('onSubmitBuy', function(event, obj) {
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
        var result = $filter('filter')(self.companies, {id: objectID})[0];
        if (result) {
          self.selectedItem = result.description;
          self.searchText = result.description;
        }
    }

    function showDialog($event) {
      var parentEl = angular.element(document.body);
      $mdDialog.show({
        targetEvent: $event,
        parent: parentEl,
        scope:$scope,         // use parent scope in template
        preserveScope: true,
        templateUrl:'views/directives-templates/formNewCompany.html',
        controller:function($scope, $mdDialog) {
          $scope.closeDialog = function() {
            $mdDialog.hide();
          }
          $scope.create = function(company){
            CompanyService.create(company)
              .then(
                function(d) {
                  self.fetchAll();
                },
                function(errResponse){
                  console.error(errResponse);
                }
              );
          };
          $scope.submit = function() {
            if($scope.company.id==null){
              $scope.create($scope.company);
            }
            $mdDialog.hide();
          };
        }
      });
    }
  }
function ProductCtrl ($scope, ProductService, $timeout, $q, $log, $filter,$mdDialog) {
    var self = this;
    self.simulateQuery = false;
    self.isDisabled    = false;
    self.products        = [];
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    $scope.product = {id:null,description:'',brand:'',code:'',type:'',subtype:'',size:'',packaging:''};
    $scope.showDialog = showDialog;

    // ******************************
    // Internal methods
    // ******************************
    self.fetchAll = function(){
      ProductService.fetchAll()
        .then(
          function(d) {
            self.products = d;
           // $log.info('fetchAll product' );
          },
          function(errResponse){
            console.error(errResponse);
          }
        );
    };
    /**
     *
     */
    self.fetchAllPopulate = function(){
      ProductService.fetchAll()
        .then(
          function(d) {
            $scope.populateArray(d,'product');
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
      //$log.info('querySearch product' );
      var results = query ? self.products.filter( createFilterFor(query) ) : self.products,
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
      //$log.info('selectedItemChange product ' );
      if (item && item.id) {
         $scope.ctrl.buy.productID = item.id;
       // $log.info('Id ' + $scope.ctrl.buy.productID);
      }
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      $log.info('createFilterFor product' );
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(product) {
        return (product.id.indexOf(lowercaseQuery) === 0);
      };

    }
    $scope.$on('onSubmitBuy', function(event, obj) {
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
        var result = $filter('filter')(self.products, {id: objectID})[0];
        if (result) {
          self.selectedItem = result.description;
          self.searchText = result.description;
        }
    }
    function showDialog($event) {
      var parentEl = angular.element(document.body);
      $mdDialog.show({
        targetEvent: $event,
        parent: parentEl,
        scope:$scope,         // use parent scope in template
        preserveScope: true,
        templateUrl:'views/directives-templates/formNewProduct.html',
        controller:function($scope, $mdDialog) {
          $scope.closeDialog = function() {
            $mdDialog.hide();
          }
          $scope.create = function(product){
            ProductService.create(product)
              .then(
                function(d) {
                  self.fetchAll();
                },
                function(errResponse){
                  console.error(errResponse);
                }
              );
          };
          $scope.submit = function() {
            if($scope.product.id==null){
              $scope.create($scope.product);
            }
            $mdDialog.hide();
          };
        }
      });
    }
  }
function BoxDiscountCtrl ($scope, ProductService, $timeout, $q, $log, $filter,$mdDialog) {
  var self = this;
  self.simulateQuery = false;
  self.isDisabled    = false;
  self.products        = [];
  self.querySearch   = querySearch;
  self.selectedItemChange = selectedItemChange;
  $scope.product = {id:null,description:'',brand:'',code:'',type:'',subtype:'',size:'',packaging:''};
  $scope.showDialog = showDialog;

  // ******************************
  // Internal methods
  // ******************************
  self.fetchAll = function(){
    ProductService.fetchAll()
      .then(
        function(d) {
          self.products = d;
          // $log.info('fetchAll product' );
        },
        function(errResponse){
          console.error(errResponse);
        }
      );
  };
  /**
   *
   */
  self.fetchAllPopulate = function(){
    ProductService.fetchAll()
      .then(
        function(d) {
          $scope.populateArray(d,'boxDiscount');
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
    //$log.info('querySearch product' );
    var results = query ? self.products.filter( createFilterFor(query) ) : self.products,
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
    //$log.info('selectedItemChange product ' );
    if (item && item.id) {
      $scope.ctrl.buy.productID = item.id;
      // $log.info('Id ' + $scope.ctrl.buy.productID);
    }
  }

  /**
   * Create filter function for a query string
   */
  function createFilterFor(query) {
    $log.info('createFilterFor product' );
    var lowercaseQuery = angular.lowercase(query);

    return function filterFn(product) {
      return (product.id.indexOf(lowercaseQuery) === 0);
    };

  }
  $scope.$on('onSubmitBox', function(event, obj) {
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
    var result = $filter('filter')(self.products, {id: objectID})[0];
    if (result) {
      self.selectedItem = result.description;
      self.searchText = result.description;
    }
  }
  function showDialog($event) {
    var parentEl = angular.element(document.body);
    $mdDialog.show({
      targetEvent: $event,
      parent: parentEl,
      scope:$scope,         // use parent scope in template
      preserveScope: true,
      templateUrl:'views/directives-templates/formNewProduct.html',
      controller:function($scope, $mdDialog) {
        $scope.closeDialog = function() {
          $mdDialog.hide();
        }
        $scope.create = function(product){
          ProductService.create(product)
            .then(
              function(d) {
                self.fetchAll();
              },
              function(errResponse){
                console.error(errResponse);
              }
            );
        };
        $scope.submit = function() {
          if($scope.product.id==null){
            $scope.create($scope.product);
          }
          $mdDialog.hide();
        };
      }
    });
  }
}
function CreditCardDiscountCtrl ($scope, ProductService, $timeout, $q, $log, $filter,$mdDialog) {
  var self = this;
  self.simulateQuery = false;
  self.isDisabled    = false;
  self.products        = [];
  self.querySearch   = querySearch;
  self.selectedItemChange = selectedItemChange;
  $scope.product = {id:null,description:'',brand:'',code:'',type:'',subtype:'',size:'',packaging:''};
  $scope.showDialog = showDialog;

  // ******************************
  // Internal methods
  // ******************************
  self.fetchAll = function(){
    ProductService.fetchAll()
      .then(
        function(d) {
          self.products = d;
          // $log.info('fetchAll product' );
        },
        function(errResponse){
          console.error(errResponse);
        }
      );
  };
  /**
   *
   */
  self.fetchAllPopulate = function(){
    ProductService.fetchAll()
      .then(
        function(d) {
          $scope.populateArray(d,'creditCardDiscount');
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
    //$log.info('querySearch product' );
    var results = query ? self.products.filter( createFilterFor(query) ) : self.products,
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
    //$log.info('selectedItemChange product ' );
    if (item && item.id) {
      $scope.ctrl.buy.productID = item.id;
      // $log.info('Id ' + $scope.ctrl.buy.productID);
    }
  }

  /**
   * Create filter function for a query string
   */
  function createFilterFor(query) {
    $log.info('createFilterFor product' );
    var lowercaseQuery = angular.lowercase(query);

    return function filterFn(product) {
      return (product.id.indexOf(lowercaseQuery) === 0);
    };

  }
  $scope.$on('onSubmitCreditCard', function(event, obj) {
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
    var result = $filter('filter')(self.products, {id: objectID})[0];
    if (result) {
      self.selectedItem = result.description;
      self.searchText = result.description;
    }
  }
  function showDialog($event) {
    var parentEl = angular.element(document.body);
    $mdDialog.show({
      targetEvent: $event,
      parent: parentEl,
      scope:$scope,         // use parent scope in template
      preserveScope: true,
      templateUrl:'views/directives-templates/formNewProduct.html',
      controller:function($scope, $mdDialog) {
        $scope.closeDialog = function() {
          $mdDialog.hide();
        }
        $scope.create = function(product){
          ProductService.create(product)
            .then(
              function(d) {
                self.fetchAll();
              },
              function(errResponse){
                console.error(errResponse);
              }
            );
        };
        $scope.submit = function() {
          if($scope.product.id==null){
            $scope.create($scope.product);
          }
          $mdDialog.hide();
        };
      }
    });
  }
}
