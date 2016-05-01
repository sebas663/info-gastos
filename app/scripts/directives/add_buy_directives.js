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
App.directive('discountAutocomplete', function() {
  return {
    templateUrl: 'views/directives-templates/discount-autocomplete.html'
  };
});
App.directive('creditCardAutocomplete', function() {
  return {
    templateUrl: 'views/directives-templates/credit-card-autocomplete.html'
  };
});
App.directive('buysGrid', function() {
  return {
    templateUrl: 'views/directives-templates/buysGrid.html'
  };
});
App.directive('discountBoxGrid', function() {
  return {
    templateUrl: 'views/directives-templates/discountBoxGrid.html'
  };
});
App.directive('discountCreditCardGrid', function() {
  return {
    templateUrl: 'views/directives-templates/discountCreditCardGrid.html'
  };
});
App.directive('formBoxDiscount', function() {
  return {
    templateUrl: 'views/directives-templates/formBoxDiscount.html'
  };
});
App.directive('formCreditCardDiscount', function() {
  return {
    templateUrl: 'views/directives-templates/formCreditCardDiscount.html'
  };
});
App.directive('formBuys', function() {
  return {
    templateUrl: 'views/directives-templates/formBuys.html'
  };
});
