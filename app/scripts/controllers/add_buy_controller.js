'use strict';

App.controller('AddBuyController', AddBuyController);
App.controller('CompanyCtrl', CompanyCtrl);
App.controller('ProductCtrl', ProductCtrl);
App.controller('BoxDiscountCtrl', BoxDiscountCtrl);
App.controller('CreditCardDiscountCtrl', CreditCardDiscountCtrl);


function AddBuyController ($scope,AddBuyService,AutocompleteService, $filter){

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
          self.querySearch  = AutocompleteService.querySearch;
          self.getObjectById  = AutocompleteService.getObjectById;

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
            self.reset('buyForm');
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
                     setBuyDefaults(self.buys[i]);
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
              self.selectedCompany = null;
              self.searchTxtCompany = "";
              self.selectedProduct = null;
              self.searchTxtProduct = "";
            }
            else if (type == 'creditCardForm'){
              $scope.creditCardForm.$setPristine(); //reset Form
              self.creditCardDiscount = angular.copy(oriCreditCardDiscount);

            }
            else if (type == 'discBoxForm'){
              $scope.discBoxForm.$setPristine(); //reset Form
              self.boxDiscount = angular.copy(oriBoxDiscount);

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
  
          self.selectedCompanyChange = function (item) {
            if (item && item.id) {
              self.buy.companyID = item.id;
            }
          }
          self.selectedProductChange = function (item) {
            if (item && item.id) {
              self.buy.companyID = item.id;
            }
          }
          function setBuyDefaults(object) {
            self.buy = angular.copy(object);
            self.buy.buyDate = new Date(self.buy.buyDate);
            var result =  self.getObjectById(self.buy.companyID,self.companies);
            var result2 = self.getObjectById(self.buy.productID,self.products);
            if (result) {
              self.selectedCompany = result.description;
              self.searchTxtCompany = result.description;
            }
            if (result2) {
              self.selectedProduct = result2.description;
              self.searchTxtProduct = result2.description;
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
function BoxDiscountCtrl ($scope, ProductService,$mdDialog) {
  var self = this;
  self.boxDiscounts        = [];
  $scope.boxDiscount = {id:null,description:'',brand:'',code:'',type:'',subtype:'',size:'',packaging:''};
  $scope.showDialog = showDialog;

  self.fetchAll = function(){
    ProductService.fetchAll()
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
      templateUrl:'views/directives-templates/formNewBoxDiscount.html',
      controller:function($scope, $mdDialog) {
        $scope.closeDialog = function() {
          $mdDialog.hide();
        }
        $scope.create = function(boxDiscount){
          ProductService.create(boxDiscount)
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
function CreditCardDiscountCtrl ($scope, ProductService, $mdDialog) {
  var self = this;
  self.products        = [];
  $scope.product = {id:null,description:'',brand:'',code:'',type:'',subtype:'',size:'',packaging:''};
  $scope.showDialog = showDialog;

  self.fetchAll = function(){
    ProductService.fetchAll()
      .then(
        function(d) {
          self.products = d;
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
