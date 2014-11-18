module.exports = require('eden-class').extend(function() {
	/* Require
	-------------------------------*/
	var hash = require('eden-hash');
	var rest = require('eden-rest');
	
	/* Constants
	-------------------------------*/
	this.REQUEST_TOKEN	= '/[VERSION]/oauth2/token';
	
	/* Public Properties
	-------------------------------*/
	/* Protected Properties
	-------------------------------*/
	this._client 		= null;
	this._isLive		= true;
	this._parent		= null;
	this._requestId		= null;
	this._requestUrl	= null;
	this._secret		= null;
	this._version 		= 'v1';

	/* Private Properties
	-------------------------------*/
	var __noop = function() {};

	/* Magic
	-------------------------------*/
	this.___construct = function(client, secret, isLive, parent) {
		this._client		= client;
		this._secret		= secret;
		this._parent		= parent;
		this._requestUrl	= parent.BASE_LIVE;
		this._version		= parent._version;
		
		//if this is not a live requet
		//let's use the sandbox base url
		if(!isLive) {
			this._requestUrl = parent.BASE_SANDBOX;
		}
	};
	
	/* Public Methods
	-------------------------------*/
	/**
	 * Returns the access token
	 *
	 * @param function
	 * @return object
	 */
	this.getAccess = function(callback) {
		return this._getAccess(callback);
	};
	
	/**
	 * Set request ID
	 *
	 * @param int
	 * @return this
	 */
	this.setRequestId = function(requestId) {
		this.argument().test(1, 'int');
			
		this._requestId = requestId;
		return this;
	};
	
	/* Protected Methods
	-------------------------------*/
	this._getAccess = function(callback) {
		//set the query
		var query = {};
		query['grant_type'] = 'client_credentials';
		
		//set rest
		var request = rest()
			.setUrl(this._requestUrl+
				this.REQUEST_TOKEN.replace('[VERSION]', this._version))
			.setHeaders('Content-Type', 'application/x-www-form-urlencoded')
			.setHeaders('Accept', 'application/json')
			.setHeaders('Accept-Language', 'en_US')
			.setAuthentication(this._client, this._secret);
		
		//if there is request ID
		if(this._requestId) {
			request.setHeaders('PayPal-Request-Id', this._requestId)
		}
		
		request.setMethod('POST')
			.setBody(hash().toQuery(query))
			.getQueryResponse(callback);
		
		return this;
	};
	
	/* Private Methods
	-------------------------------*/
}).register('eden/paypal/auth');