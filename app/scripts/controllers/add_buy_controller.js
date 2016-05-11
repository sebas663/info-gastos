'use strict';

App.controller('AddBuyController', AddBuyController);
App.controller('CompanyCtrl', CompanyCtrl);
App.controller('ProductCtrl', ProductCtrl);
App.controller('BoxDiscountCtrl', BoxDiscountCtrl);
App.controller('CreditCardDiscountCtrl', CreditCardDiscountCtrl);


function AddBuyController ($scope,BuyService,AutocompleteService,LocalStorageService, $filter){

		  var self = this;
          self.ticket = null;
          self.buy = null;
          self.boxDiscount = null;
          self.creditCardDiscount = null;
          self.buys=[];
          self.masterBoxDiscounts=[];
          self.masterCreditCardDiscounts=[];
          self.masterCompanies=[];
          self.masterProducts=[];

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
      					       },
            					function(errResponse){
            						console.error(errResponse);
            					}
      			       );
          };
          self.fetchBuy = function(){
            LocalStorageService.fetchBuy()
              .then(
                function(d) {
                  self.buy = d;
                },
                function(errResponse){
                  console.error(errResponse);
                }
              );
          };
          self.fetchBoxDiscount = function(){
            LocalStorageService.fetchBoxDiscount()
              .then(
                function(d) {
                  self.boxDiscount = d;
                },
                function(errResponse){
                  console.error(errResponse);
                }
              );
          };
          self.fetchCreditCardDiscount = function(){
            LocalStorageService.fetchCreditCardDiscount()
              .then(
                function(d) {
                  self.creditCardDiscount = d;
                },
                function(errResponse){
                  console.error(errResponse);
                }
              );
          };
          self.addBuyToTicket = function(buy,ticket){
            LocalStorageService.addBuyToTicket(buy,ticket)
              .then(
                function(d) {
                  self.ticket = d;
                },
                function(errResponse){
                  console.error('Error while creating Buy.');
                }
              );
          };


          self.updateBuyInTicket = function(buy,ticket){
            LocalStorageService.updateBuyInTicket(buy,ticket)
		              .then(
                      function(d) {
                        self.ticket = d;
                      },
				              function(errResponse){
					               console.error('Error while updating Buy.');
				              }
                  );
          };

          self.deleteBuy = function(index,ticket){
            LocalStorageService.deleteBuyInTicket(index,ticket)
		              .then(
                      function(d) {
                        self.ticket = d;
                      },
				              function(errResponse){
					               console.error('Error while deleting Buy.');
				              }
                  );
          };
          self.addBoxDiscountToTicket = function(boxDiscount,ticket){
            LocalStorageService.addBoxDiscountToTicket(boxDiscount,ticket)
              .then(
                  function(d) {
                    self.ticket = d;
                  },
                  function(errResponse){
                    console.error('Error while creating BoxDiscount.');
                  }
              );
          };


          self.updateBoxDiscountInTicket = function(boxDiscount,ticket){
            console.log(' updateBoxDiscountInTicket ');
            LocalStorageService.updateBoxDiscountInTicket(boxDiscount,ticket)
              .then(
                  function(d) {
                    self.ticket = d;
                  },
                  function(errResponse){
                    console.error('Error while updating BoxDiscount.');
                  }
              );
          };

          self.deleteBoxDiscount = function(index,ticket){
            LocalStorageService.deleteBoxDiscountInTicket(index,ticket)
              .then(
                  function(d) {
                    self.ticket = d;
                  },
                  function(errResponse){
                    console.error('Error while deleting BoxDiscount.');
                  }
              );
          };
          self.addCreditCardDiscountToTicket = function(creditCardDiscount,ticket){
            LocalStorageService.addCreditCardDiscountToTicket(creditCardDiscount,ticket)
              .then(
                  function(d) {
                    self.ticket = d;
                  },
                  function(errResponse){
                    console.error('Error while creating CreditCardDiscount.');
                  }
              );
          };


          self.updateCreditCardDiscountInTicket = function(creditCardDiscount,ticket){
            LocalStorageService.updateCreditCardDiscountInTicket(creditCardDiscount,ticket)
              .then(
                  function(d) {
                    self.ticket = d;
                  },
                  function(errResponse){
                    console.error('Error while updating CreditCardDiscount.');
                  }
              );
          };

          self.deleteCreditCardDiscount = function(index,ticket){
            LocalStorageService.deleteCreditCardDiscountInTicket(index,ticket)
              .then(
                  function(d) {
                    self.ticket = d;
                  },
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
          self.fetchBuy();
          self.fetchBoxDiscount();
          self.fetchCreditCardDiscount();

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
              self.fetchBuy();
              self.selectedProduct = null;
              self.searchTxtProduct = "";
            }
            else if (type == 'creditCardForm'){
              $scope.creditCardForm.$setPristine(); //reset Form
              self.fetchCreditCardDiscount();
              self.selectedCreditCard = null;
              self.searchTextCreditCard = "";
            }
            else if (type == 'discBoxForm'){
              $scope.discBoxForm.$setPristine(); //reset Form
              self.fetchBoxDiscount();
              self.selectedBoxDiscount = null;
              self.searchTextBoxDiscount = "";
            }

          };
         /*
          *      autocomplete block
          */
          $scope.populateArray = function(array,type){
            if(type == 'masterCompany'){
              self.masterCompanies = array;
            }
            else if (type == 'masterProduct'){
              self.masterProducts = array;
            }
            else if (type == 'masterBoxDiscount'){
              self.masterBoxDiscounts = array;
            }
            else if (type == 'masterCreditCardDiscount'){
              self.masterCreditCardDiscounts = array;
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
            var result = self.getObjectById(self.buy.productID,self.masterProducts);
            if (result) {
              self.selectedProduct = result.description;
              self.searchTxtProduct = result.description;
            }
          }
          function setBoxDiscountDefaults(object) {
            self.boxDiscount = angular.copy(object);
            var result = self.getObjectById(self.boxDiscount.boxDiscountID,self.masterBoxDiscounts);
            if (result) {
              self.selectedBoxDiscount = result.description;
              self.searchTextBoxDiscount = result.description;
            }
          }
          function setCreditCardDiscountDefaults(object) {
            self.creditCardDiscount = angular.copy(object);
            var result = self.getObjectById(self.creditCardDiscount.creditCardDiscountID,self.masterCreditCardDiscounts);
            if (result) {
              self.selectedCreditCard = result.description;
              self.searchTextCreditCard = result.description;
            }
          }
}

function CompanyCtrl ($scope, CompanyService,$mdDialog) {
    var self = this;
    self.masterCompanies = [];
    $scope.masterCompany = {id:null,description:'',entry:'',code:'',subsidiary:'',address:''};
    $scope.showDialog = showDialog;

    self.fetchAll = function(){
      CompanyService.fetchAll()
        .then(
          function(d) {
            self.masterCompanies = d;
            $scope.populateArray(d,'masterCompany');
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
          $scope.create = function(obj){
            CompanyService.create(obj)
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
            if($scope.masterCompany.id==null){
              $scope.create($scope.masterCompany);
            }
            $mdDialog.hide();
          };
        }
      });
    }
  }
function ProductCtrl ($scope, ProductService,$mdDialog) {
    var self = this;
    self.masterProducts        = [];
    $scope.masterProduct = {id:null,description:'',brand:'',code:'',type:'',subtype:'',size:'',packaging:''};
    $scope.showDialog = showDialog;

    self.fetchAll = function(){
      ProductService.fetchAll()
        .then(
          function(d) {
            self.masterProducts = d;
            $scope.populateArray(d,'masterProduct');
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
          $scope.create = function(obj){
            ProductService.create(obj)
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
            if($scope.masterProduct.id==null){
              $scope.create($scope.masterProduct);
            }
            $mdDialog.hide();
          };
        }
      });
    }
  }
function BoxDiscountCtrl ($scope, BoxDiscountService,$mdDialog) {
  var self = this;
  self.masterBoxDiscounts  = [];
  $scope.masterBoxDiscount = {id:null,description:'',brand:'',code:'',type:'',subtype:'',size:'',packaging:''};
  $scope.showDialog  = showDialog;

  self.fetchAll = function(){
    BoxDiscountService.fetchAll()
      .then(
        function(d) {
          self.masterBoxDiscounts = d;
          $scope.populateArray(d,'masterBoxDiscount');
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
          if($scope.masterBoxDiscount.id==null){
            $scope.create($scope.masterBoxDiscount);
          }
          $mdDialog.hide();
        };
      }
    });
  }
}
function CreditCardDiscountCtrl ($scope, CreditCardDiscountService, $mdDialog) {
  var self = this;
  self.masterCreditCardDiscounts  = [];
  $scope.masterCreditCardDiscount = {id:null,description:'',brand:'',code:'',type:'',subtype:'',size:'',packaging:''};
  $scope.showDialog = showDialog;

  self.fetchAll = function(){
    CreditCardDiscountService.fetchAll()
      .then(
        function(d) {
          self.masterCreditCardDiscounts = d;
          $scope.populateArray(d,'masterCreditCardDiscount');
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
          if($scope.masterCreditCardDiscount.id==null){
            $scope.create($scope.masterCreditCardDiscount);
          }
          $mdDialog.hide();
        };
      }
    });
  }
}
