'use strict';

App.controller('AddBuyController', AddBuyController);
App.controller('CompanyCtrl', CompanyCtrl);
App.controller('ProductCtrl', ProductCtrl);
App.controller('BoxDiscountCtrl', BoxDiscountCtrl);
App.controller('CreditCardDiscountCtrl', CreditCardDiscountCtrl);


function AddBuyController ($scope,BuyService,AutocompleteService,LocalStorageService, $filter){

		  var self = this;
          self.ticket = LocalStorageService.fetchTicket;
          self.buy = LocalStorageService.fetchBuy;
          self.boxDiscount = LocalStorageService.fetchBoxDiscount;
          self.creditCardDiscount = LocalStorageService.fetchCreditCardDiscount;
          self.buys=[];
          self.boxDiscounts=[];
          self.creditCardDiscounts=[];
          self.companies=[];
          self.products=[];

          //autocomplete block
          self.resetAutocomplete = false;
          self.querySearch  = AutocompleteService.querySearch;
          self.getObjectById  = AutocompleteService.getObjectById;
          //autocomplete block
          self.isDisabledImputs = false;
          self.isNewRecord = true;

          self.fetchTicket = function(){
            LocalStorageService.fetchTicket()
                 .then(
      					       function(d) {
      						        self.ticket = d;
                         // console.log("ticket controller " + angular.toJson(d));
      					       },
            					function(errResponse){
            						console.error(errResponse);
            					}
      			       );
          };
          self.addBuyToTicket = function(buy,ticket){
            LocalStorageService.addBuyToTicket(buy,ticket)
              .then(
                self.fetchTicket,
                function(errResponse){
                  console.error('Error while creating Buy.');
                }
              );
          };


          self.updateBuyInTicket = function(buy,ticket){
            LocalStorageService.updateBuyInTicket(buy,ticket)
		              .then(
				              self.fetchTicket,
				              function(errResponse){
					               console.error('Error while updating Buy.');
				              }
                  );
          };

          self.deleteBuy = function(index,ticket){
            LocalStorageService.deleteBuyInTicket(index,ticket)
		              .then(
				              self.fetchTicket,
				              function(errResponse){
					               console.error('Error while deleting Buy.');
				              }
                  );
          };
          self.addBoxDiscountToTicket = function(boxDiscount,ticket){
            LocalStorageService.addBoxDiscountToTicket(boxDiscount,ticket)
              .then(
                self.fetchTicket,
                function(errResponse){
                  console.error('Error while creating BoxDiscount.');
                }
              );
          };


          self.updateBoxDiscountInTicket = function(boxDiscount,ticket){
            console.log(' updateBoxDiscountInTicket ');
            LocalStorageService.updateBoxDiscountInTicket(boxDiscount,ticket)
              .then(
                self.fetchTicket,
                function(errResponse){
                  console.error('Error while updating BoxDiscount.');
                }
              );
          };

          self.deleteBoxDiscount = function(index,ticket){
            LocalStorageService.deleteBoxDiscountInTicket(index,ticket)
              .then(
                self.fetchTicket,
                function(errResponse){
                  console.error('Error while deleting BoxDiscount.');
                }
              );
          };
          self.addCreditCardDiscountToTicket = function(creditCardDiscount,ticket){
            LocalStorageService.addCreditCardDiscountToTicket(creditCardDiscount,ticket)
              .then(
                self.fetchTicket,
                function(errResponse){
                  console.error('Error while creating CreditCardDiscount.');
                }
              );
          };


          self.updateCreditCardDiscountInTicket = function(creditCardDiscount,ticket){
            LocalStorageService.updateCreditCardDiscountInTicket(creditCardDiscount,ticket)
              .then(
                self.fetchTicket,
                function(errResponse){
                  console.error('Error while updating CreditCardDiscount.');
                }
              );
          };

          self.deleteCreditCardDiscount = function(index,ticket){
            LocalStorageService.deleteCreditCardDiscountInTicket(index,ticket)
              .then(
                self.fetchTicket,
                function(errResponse){
                  console.error('Error while deleting CreditCardDiscount.');
                }
              );
          };

          self.saveTicket = function(ticket){
            BuyService.saveTicket(ticket)
              .then(
                self.fetchTicket,
                function(errResponse){
                  console.error('Error while save ticket.');
                }
              );
          };

          self.fetchTicket();

          self.submitBuy = function(isNew) {
              if(isNew){
                self.isDisabledImputs = true;
                self.addBuyToTicket(self.buy,self.ticket);
              }else{
                self.updateBuyInTicket(self.buy,self.ticket);
                self.isNewRecord = true;
              }
            self.reset('buyForm');
          };

          self.submitDiscBox = function(isNew) {
            if(isNew){
              self.addBoxDiscountToTicket(self.boxDiscount,self.ticket);
            }else{
              self.updateBoxDiscountInTicket(self.boxDiscount,self.ticket);
              self.isNewRecord = true;
            }
            self.reset('discBoxForm');
          };

          self.submitDiscCreditCard = function(isNew) {
            if(isNew){
              self.addCreditCardDiscountToTicket(self.creditCardDiscount,self.ticket);
            }else{
              self.updateCreditCardDiscountInTicket(self.creditCardDiscount,self.ticket);
              self.isNewRecord = true;
            }
            self.reset('creditCardForm');
          };


          self.submitTicket = function() {
            self.saveTicket(self.ticket);
            LocalStorageService.resetTicket();
          };

          self.edit = function(obj,type){
            if (type == 'buy'){
              setBuyDefaults(obj);
            }
            else if (type == 'boxDiscount'){
              setBoxDiscountDefaults(obj)
            }
            else if (type == 'creditCardDiscount'){
              setCreditCardDiscountDefaults(obj)
            }
            self.isNewRecord = false;
          };

          self.remove = function(index,type){
            if (type == 'buy'){
              if(angular.equals(self.buy.index, index)) {//clean form if the user to be deleted is shown there.
                self.reset('buyForm');
              }
              self.deleteBuy(index,self.ticket);
            }
            else if (type == 'boxDiscount'){
              if(angular.equals(self.boxDiscount.index, index)) {//clean form if the user to be deleted is shown there.
                self.reset('discBoxForm');
              }
              self.deleteBoxDiscount(index,self.ticket);
            }
            else if (type == 'creditCardDiscount'){
              if(angular.equals(self.creditCardDiscount.index, index)) {//clean form if the user to be deleted is shown there.
                self.reset('creditCardForm');
              }
              self.deleteCreditCardDiscount(index,self.ticket);
            }

          };

          self.reset = function(type){
            if(type == 'buyForm'){
              $scope.buyForm.$setPristine(); //reset Form
              self.buy = angular.copy(oriBuy);
              self.buy.buyDate = new Date();
              self.selectedProduct = null;
              self.searchTxtProduct = "";
            }
            else if (type == 'creditCardForm'){
              $scope.creditCardForm.$setPristine(); //reset Form
              self.creditCardDiscount = angular.copy(oriCreditCardDiscount);
              self.selectedCreditCard = null;
              self.searchTextCreditCard = "";
            }
            else if (type == 'discBoxForm'){
              $scope.discBoxForm.$setPristine(); //reset Form
              self.boxDiscount = angular.copy(oriBoxDiscount);
              self.selectedBoxDiscount = null;
              self.searchTextBoxDiscount = "";
            }

          };
         /*
          *      autocomplete block
          */
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

          self.selectedItemChange = function (item,type){
            if (item && item.id) {
              if(type == 'company'){
                self.ticket.companyID = item.id;
              }
              else if (type == 'product'){
                self.buy.productID = item.id;
              }
              else if (type == 'boxDiscount'){
                self.boxDiscount.boxDiscountID = item.id;
              }
              else if (type == 'creditCardDiscount'){
                self.creditCardDiscount.creditCardDiscountID = item.id;
              }

            }
          }
          /*
           *    end  autocomplete block
           */
          function setBuyDefaults(object) {
            self.buy = angular.copy(object);
            var result = self.getObjectById(self.buy.productID,self.products);
            if (result) {
              self.selectedProduct = result.description;
              self.searchTxtProduct = result.description;
            }
          }
          function setBoxDiscountDefaults(object) {
            self.boxDiscount = angular.copy(object);
            var result = self.getObjectById(self.boxDiscount.boxDiscountID,self.boxDiscounts);
            if (result) {
              self.selectedBoxDiscount = result.description;
              self.searchTextBoxDiscount = result.description;
            }
          }
          function setCreditCardDiscountDefaults(object) {
            self.creditCardDiscount = angular.copy(object);
            var result = self.getObjectById(self.creditCardDiscount.creditCardDiscountID,self.creditCardDiscounts);
            if (result) {
              self.selectedCreditCard = result.description;
              self.searchTextCreditCard = result.description;
            }
          }
}

function CompanyCtrl ($scope, CompanyService,$mdDialog) {
    var self = this;
    self.companies = [];
    $scope.company = {id:null,description:'',entry:'',code:'',subsidiary:'',address:''};
    $scope.showDialog = showDialog;

    self.fetchAll = function(){
      CompanyService.fetchAll()
        .then(
          function(d) {
            self.companies = d;
            $scope.populateArray(d,'company');
          },
          function(errResponse){
            console.error(errResponse);
          }
        );
    };

    self.fetchAll();

    function showDialog($event) {
      var parentEl = angular.element(document.body);
      $mdDialog.show({
        targetEvent: $event,
        parent: parentEl,
        scope:$scope,         // use parent scope in template
        preserveScope: true,
        templateUrl:'views/directives-templates/master-company-form.html',
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
function ProductCtrl ($scope, ProductService,$mdDialog) {
    var self = this;
    self.products        = [];
    $scope.product = {id:null,description:'',brand:'',code:'',type:'',subtype:'',size:'',packaging:''};
    $scope.showDialog = showDialog;

    self.fetchAll = function(){
      ProductService.fetchAll()
        .then(
          function(d) {
            self.products = d;
            $scope.populateArray(d,'product');
          },
          function(errResponse){
            console.error(errResponse);
          }
        );
    };

    self.fetchAll();

    function showDialog($event) {
      var parentEl = angular.element(document.body);
      $mdDialog.show({
        targetEvent: $event,
        parent: parentEl,
        scope:$scope,         // use parent scope in template
        preserveScope: true,
        templateUrl:'views/directives-templates/master-product-form.html',
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
function BoxDiscountCtrl ($scope, BoxDiscountService,$mdDialog) {
  var self = this;
  self.boxDiscounts  = [];
  $scope.boxDiscount = {id:null,description:'',brand:'',code:'',type:'',subtype:'',size:'',packaging:''};
  $scope.showDialog  = showDialog;

  self.fetchAll = function(){
    BoxDiscountService.fetchAll()
      .then(
        function(d) {
          self.boxDiscounts = d;
          $scope.populateArray(d,'boxDiscount');
        },
        function(errResponse){
          console.error(errResponse);
        }
      );
  };

  self.fetchAll();

  function showDialog($event) {
    var parentEl = angular.element(document.body);
    $mdDialog.show({
      targetEvent: $event,
      parent: parentEl,
      scope:$scope,         // use parent scope in template
      preserveScope: true,
      templateUrl:'views/directives-templates/master-box-discount-form.html',
      controller:function($scope, $mdDialog) {
        $scope.closeDialog = function() {
          $mdDialog.hide();
        }
        $scope.create = function(obj){
          BoxDiscountService.create(obj)
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
          if($scope.boxDiscount.id==null){
            $scope.create($scope.boxDiscount);
          }
          $mdDialog.hide();
        };
      }
    });
  }
}
function CreditCardDiscountCtrl ($scope, CreditCardDiscountService, $mdDialog) {
  var self = this;
  self.creditCardDiscounts  = [];
  $scope.creditCardDiscount = {id:null,description:'',brand:'',code:'',type:'',subtype:'',size:'',packaging:''};
  $scope.showDialog = showDialog;

  self.fetchAll = function(){
    CreditCardDiscountService.fetchAll()
      .then(
        function(d) {
          self.creditCardDiscounts = d;
          $scope.populateArray(d,'creditCardDiscount');
        },
        function(errResponse){
          console.error(errResponse);
        }
      );
  };

  self.fetchAll();

  function showDialog($event) {
    var parentEl = angular.element(document.body);
    $mdDialog.show({
      targetEvent: $event,
      parent: parentEl,
      scope:$scope,         // use parent scope in template
      preserveScope: true,
      templateUrl:'views/directives-templates/master-credit-card-discount-form.html',
      controller:function($scope, $mdDialog) {
        $scope.closeDialog = function() {
          $mdDialog.hide();
        }
        $scope.create = function(obj){
          CreditCardDiscountService.create(obj)
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
          if($scope.creditCardDiscount.id==null){
            $scope.create($scope.creditCardDiscount);
          }
          $mdDialog.hide();
        };
      }
    });
  }
}
