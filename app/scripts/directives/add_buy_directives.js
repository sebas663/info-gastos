'use strict';

App.directive('productAutocomplete', function($mdDialog) {
	  return {
	    templateUrl: 'views/directives-templates/product-autocomplete.html',
      scope: { products: "@products",
               populateProducts: '&'
      },
      //controller:ProductCtrl,
      link: function(scope) {
        scope.showDialog = showDialog;
        scope.product = {id:null,description:''};
        function showDialog($event) {
          var parentEl = angular.element(document.body);
          $mdDialog.show({
            targetEvent: $event,
            parent: parentEl,
            preserveScope: true,
            templateUrl:'views/directives-templates/formNewProduct.html',
            controller:function($scope, $mdDialog,ProductService) {
                $scope.closeDialog = function() {
                  $mdDialog.hide();
                }
                $scope.create = function(product){
                  ProductService.create(product)
                    .then(
                      function(d) {

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

        };

      }

    };
	});

App.directive('companyAutocomplete', function() {
		return {
		  templateUrl: 'views/directives-templates/company-autocomplete.html'
		};
	});
App.directive('productCodeExt', function() {
  return {
    templateUrl: 'views/directives-templates/product_code_ext.html'
  };
});
App.directive('quantity', function() {
  return {
    templateUrl: 'views/directives-templates/quantity.html'
  };
});
App.directive('price', function() {
  return {
    templateUrl: 'views/directives-templates/price.html'
  };
});
App.directive('datepicker', function() {
  return {
    templateUrl: 'views/directives-templates/datepicker.html'
  };
});
App.directive('buysGrid', function() {
  return {
    templateUrl: 'views/directives-templates/buysGrid.html'
  };
});
