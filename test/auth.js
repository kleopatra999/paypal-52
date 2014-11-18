var paypal = require('../paypal');

var clientId 	= 'ASTkkxBBRDNZM2RuVqmfJ5IRI0z75oRj1wH5I_z6RYaXGKBudPXif-TlgTcD';
var secret 		= 'EP1a9xBndTxLqvL5FjVFHXKkWffNg6bzNb1CslpqqZAklUcHeFqeh3bcq4RV';

describe('Eden JS Paypal Api Auth Test', function() {
    describe('Functional Test', function() {
        it('must return access token', function() {
            paypal()
				.auth(clientId, secret, false)
				.setRequestId(1231412)
				.getAccess();
        });
    });
});
