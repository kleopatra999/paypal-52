module.exports = require('eden-class').extend(function() {
	/* Require
	-------------------------------*/
	var hash = require('eden-hash');
	var rest = require('eden-rest');
	
	/* Constants
	-------------------------------*/
	this.CREATE_PAYMENT	= '/[VERSION]/payments/payment';
	
	/* Public Properties
	-------------------------------*/
	/* Protected Properties
	-------------------------------*/
	this._accessToken 	= null;
	this._parent		= null;
	this._tokenType		= null;
	this._version 		= 'v1';
	
	/* Private Properties
	-------------------------------*/
	var __noop = function() {};

	/* Magic
	-------------------------------*/
	this.___construct = function(accessToken, tokenType, isLive, parent) {
		this._accessToken 	= accessToken;
		this._parent		= parent;
		
		//we set the requet url to live by default
		this._requestUrl	= parent.BASE_LIVE;
		this._tokenType		= tokenType;
		this._version		= parent._version;
		
		//if the call is not live,
		//let's use the sandbox URL
		if(!isLive && isLive != undefined) {
			this._requestUrl = parent.BASE_SANDBOX;
		}
	};
	
	/* Public Methods
	-------------------------------*/
	/**
	 * Create paypal payment
	 *
	 * @param object
	 * @param function
	 * @return this
	 */
	this.create = function(query, callback) {
		return this._getResponse(query, callback);
	};
	
	/* Protected Methods
	-------------------------------*/
	this._getResponse = function(query, callback) {
		//set rest
		rest()
			.setUrl(this._requestUrl+this.CREATE_PAYMENT
				.replace('[VERSION]', this._version))
			.setHeaders('Content-Type', 'application/json')
			.setHeaders('Authorization', this._tokenType+' '+this._accessToken)
			.setMethod('POST')
			.setBody(JSON.stringify(query))
			.getJsonResponse(callback);
		
		return this;
	}
	
	/* Private Methods
	-------------------------------*/
}).register('eden/paypal/payment');