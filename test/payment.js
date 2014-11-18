var paypal 	= require('../paypal');
var rest	= require('eden-rest');
var hash 	= require('eden-hash');

var accessToken = 'A015j1Vxv7lefyrK9cpmK9LpkgTWUeET2XQ6sN232A3YelY';
var tokenType 	= 'Bearer';

describe('Eden JS Paypal Api Payment Test', function() {
    describe('Functional Test', function() {
        it('must create paypal payment', function() {
			var options = {
				"intent": "sale",
				"payer": {
					"payment_method": "credit_card",
					"funding_instruments": [
						{
							"credit_card": {
								"number": "4417119669820331",
								"type": "visa",
								"expire_month": 11,
								"expire_year": 2018,
								"cvv2": "874",
								"first_name": "Betsy 3",
								"last_name": "Buyer 3",
								"billing_address": {
									"line1": "111 First Street",
									"city": "Saratoga",
									"state": "CA",
									"postal_code": "95070",
									"country_code": "US"
								}
							}
						}
					]
				},
				"transactions":[
					{
						"amount": {
							"total": "7.47",
							"currency": "USD",
							"details": {
								"subtotal": "7.41",
								"tax": "0.03",
								"shipping": "0.03"
							}
						},
						"description":"This is the payment transaction description."
					}
				]
			};
			
            paypal()
				.payment(accessToken, tokenType, false)
				.create(options, function(error, data) {});
        });
    });
});