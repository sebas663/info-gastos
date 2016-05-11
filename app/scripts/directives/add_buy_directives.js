'use strict';

App.directive('productAutocomplete', function($mdDialog,$log) {
	  return {
	    templateUrl: 'views/directives-templates/autocomplete-product.html'
    };
});
App.directive('companyAutocomplete', function() {
		return {
		  templateUrl: 'views/directives-templates/autocomplete-company.html'
		};
});
App.directive('discountAutocomplete', function() {
  return {
    templateUrl: 'views/directives-templates/autocomplete-box-discount.html'
  };
});
App.directive('creditCardAutocomplete', function() {
  return {
    templateUrl: 'views/directives-templates/autocomplete-credit-card-discount.html'
  };
});
App.directive('buysGrid', function() {
  return {
    templateUrl: 'views/directives-templates/grid-buys.html'
  };
});
App.directive('discountBoxGrid', function() {
  return {
    templateUrl: 'views/directives-templates/grid-discount-box.html'
  };
});
App.directive('discountCreditCardGrid', function() {
  return {
    templateUrl: 'views/directives-templates/grid-credit-card-discount.html'
  };
});
App.directive('formBoxDiscount', function() {
  return {
    templateUrl: 'views/directives-templates/form-box-discount.html'
  };
});
App.directive('formCreditCardDiscount', function() {
  return {
    templateUrl: 'views/directives-templates/form-credit-card-discount.html'
  };
});
App.directive('formBuys', function() {
  return {
    templateUrl: 'views/directives-templates/form-buys.html'
  };
});
