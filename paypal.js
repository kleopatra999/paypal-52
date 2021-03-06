module.exports = require('eden-class').extend(function() {
    /* Require
	-------------------------------*/
	/* Constants
	-------------------------------*/
	/* Public Properties
	-------------------------------*/
	/* Protected Properties
	-------------------------------*/
	this.__username 	= null;
	this.__password 	= null;
	this.__secret		= null;
	this.__certificate	= null;
	this.__isLive		= true;
	
	/* Private Properties
	-------------------------------*/
	var __noop = function() {};

	/* Magic
	-------------------------------*/
	this.___construct = function(username, password, secret, certificate, isLive) {
		this.__username 	= username;
		this.__password 	= password;
		this.__secret		= secret;
		this.__certificate	= certificate;
		
		//if the isLive is not undefined, let's set it
		if(isLive != undefined) {
			this.__isLive	= isLive;
		}
	};
	
	/* Public Methods
	-------------------------------*/
	this.checkout = function() {
		return require('./paypal/checkout.js')(
			this.__username,
			this.__password,
			this.__secret,
			this.__certificate,
			this.__isLive, this);
	};
	
	/* Protected Methods
	-------------------------------*/
	/* Private Methods
	-------------------------------*/
}).register('eden/paypal');