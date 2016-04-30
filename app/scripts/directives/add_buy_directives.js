'use strict';

App.directive('productAutocomplete', function($mdDialog,$log) {
	  return {
	    templateUrl: 'views/directives-templates/product-autocomplete.html'
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
App.directive('discountBoxGrid', function() {
  return {
    templateUrl: '../../views/directives-templates/discountBoxGrid.html'
  };
});
App.directive('discountCreditCardGrid', function() {
  return {
    templateUrl: '../../views/directives-templates/discountCreditCardGrid.html'
  };
});
