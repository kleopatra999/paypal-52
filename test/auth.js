var paypal = require('../paypal');
var assert = require('assert');

var clientId 	= 'ASTkkxBBRDNZM2RuVqmfJ5IRI0z75oRj1wH5I_z6RYaXGKBudPXif-TlgTcD';
var secret 		= 'EP1a9xBndTxLqvL5FjVFHXKkWffNg6bzNb1CslpqqZAklUcHeFqeh3bcq4RV';
var requestId	= 123456;

describe('Eden JS Paypal Api Auth Test', function() {
    describe('Functional Test', function() {
        it('must return access token', function(done) {
            paypal()
				.auth(clientId, secret, false)
				.setRequestId(requestId)
				.getAccess(function(error, response, meta) {
					assert.equal(error, null);
					assert.equal(typeof response.access_token, 'string');
					assert.equal(typeof response.token_type, 'string');
					
					done();
				});
        });
    });
});
