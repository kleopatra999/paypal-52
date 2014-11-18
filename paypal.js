module.exports = require('eden-class').extend(function() {
    /* Require
	-------------------------------*/
	/* Constants
	-------------------------------*/
	this.BASE_LIVE		= 'https://api.paypal.com';
	this.BASE_SANDBOX	= 'https://api.sandbox.paypal.com';
	
	/* Public Properties
	-------------------------------*/
	/* Protected Properties
	-------------------------------*/
	this._version 	= 'v1';
	
	/* Private Properties
	-------------------------------*/
	var __noop = function() {};

	/* Magic
	-------------------------------*/
	/* Public Methods
	-------------------------------*/
	/**
	 * Returns eden/paypal/auth class
	 *
	 * @return eden/paypal/auth
	 */
	this.auth = function(client, secret, isLive) {
		return require('./paypal/auth')(client, secret, isLive, this);
	};
	
	this.payment = function(accessToken, tokenType, isLive) {
		return require('./paypal/payment')(accessToken, tokenType, isLive, this);
	};
	
	/* Protected Methods
	-------------------------------*/
	/* Private Methods
	-------------------------------*/
}).register('eden/paypal');