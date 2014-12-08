module.exports = require('eden-class').extend(function() {
    /* Require
	-------------------------------*/
	/* Constants
	-------------------------------*/
	this.LIVE_URL	= 'https://api-3t.paypal.com/nvp';
	this.TEST_URL	= 'https://api-3t.sandbox.paypal.com/nvp';
	
	/* Public Properties
	-------------------------------*/
	/* Protected Properties
	-------------------------------*/
	this.__baseUrl		= null;
	this.__username 	= null;
	this.__password 	= null;
	this.__secret		= null;
	this.__certificate	= null;
	this.__isLive		= true;
	this.__version		= '94';
	
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
		this.__isLive		= isLive;
		
		//if the certificate is null
		if(!certificate) {
			//get the certificate here
		}
		
		//set the base url to live by default
		this.__baseUrl = this.LIVE_URL;
		
		//if the isLive is not undefined or it's false, let's use the sandbox url
		if(isLive != undefined && !isLive) {
			this.__baseUrl 	= this.TEST_URL;
			this.__isLive	= false;
		}
	};
	
	/* Public Methods
	-------------------------------*/
	/**
	 * Set the API version
	 *
	 * @param string | int | float
	 * @return this
	 */
	this.setVersion = function(version) {
		this.argument().test(1, 'string', 'int', 'float');
		
		//set the version
		this.__version = version;
		
		return this;
	};
	
	/* Protected Methods
	-------------------------------*/
	/* Private Methods
	-------------------------------*/
}).register('eden/paypal/base');