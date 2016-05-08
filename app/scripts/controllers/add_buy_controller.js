'use strict';

App.controller('AddBuyController', AddBuyController);
App.controller('CompanyCtrl', CompanyCtrl);
App.controller('ProductCtrl', ProductCtrl);
App.controller('BoxDiscountCtrl', BoxDiscountCtrl);
App.controller('CreditCardDiscountCtrl', CreditCardDiscountCtrl);


function AddBuyController ($scope,AddBuyService,AutocompleteService,LocalStorageService, $filter){

		  var self = this;
          var oriTicket = {id:null,companyID:null,buyDate:null,total:null,buys:[],boxDiscounts:[],creditCardDiscounts:[]};
          var oriBuy = {id:null,index:null,productID:null,external_code:'',quantity:null,price:null,total:null};
          // var oriBoxDiscount = {id:null,boxDiscountID:null,quantity:null,amount:null};
          // var oriCreditCardDiscount = {id:null,creditCardDiscountID:null,amount:null,base:null};
          self.ticket = angular.copy(oriTicket);
          self.buy = angular.copy(oriBuy);
          // self.boxDiscount = angular.copy(oriBoxDiscount);
          // self.creditCardDiscount = angular.copy(oriCreditCardDiscount);
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
				              self.fetchAll,
				              function(errResponse){
					               console.error('Error while updating Buy.');
				              }
                  );
          };

          self.deleteBuy = function(index,ticket){
            LocalStorageService.deleteBuyInTicket(index,ticket)
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

          self.fetchTicket();

          self.getTotal = function(){
            var total = 0;
            for(var i = 0; i < self.buys.length; i++){
              var buy = self.buys[i];
              total += buy.total;
            }
            return total;
          }

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

              self.saveBuys(self.buys);
            }else{
//                  console.log('User updated with id ', self.user.id);
            }
            self.reset();

          };

          self.edit = function(buy){
            setBuyDefaults(buy);
            self.isNewRecord = false;
          };

          self.remove = function(index){
//              console.log('id to be deleted', id);
              if(angular.equals(self.buy.index, index)) {//clean form if the user to be deleted is shown there.
                 self.reset();
              }
              self.deleteBuy(index,self.ticket);
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

            }
            else if (type == 'discBoxForm'){
              $scope.discBoxForm.$setPristine(); //reset Form
              self.boxDiscount = angular.copy(oriBoxDiscount);

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

          self.selectedCompanyChange = function (item) {
            if (item && item.id) {
              self.ticket.companyID = item.id;
            }
          }
          self.selectedProductChange = function (item) {
            if (item && item.id) {
              // console.log("item.id " + item.id);
              self.buy.productID = item.id;
            }
          }
          function setBuyDefaults(object) {
            self.buy = angular.copy(object);
            self.buy.buyDate = new Date(self.buy.buyDate);
            var result = self.getObjectById(self.buy.productID,self.products);
            if (result) {
              self.selectedProduct = result.description;
              self.searchTxtProduct = result.description;
            }
          }
        /*
         *    end  autocomplete block
         */

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
      templateUrl:'views/directives-templates/formNewBoxDiscount.html',
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
      templateUrl:'views/directives-templates/formNewCreditCardDiscount.html',
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
