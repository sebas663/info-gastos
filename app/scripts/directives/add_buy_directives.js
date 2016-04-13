'use strict';

App.directive('productAutocomplete', function() {
	  return {
	    templateUrl: 'views/directives-templates/product-autocomplete.html'
	  };
	});

App.directive('companyAutocomplete', function() {
		return {
		  templateUrl: 'views/directives-templates/company-autocomplete.html'
		};
	});
