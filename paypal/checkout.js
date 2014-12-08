module.exports = require('./base').extend(function() {
    /* Require
	-------------------------------*/
	var rest 	= require('eden-rest');
	var hash	= require('eden-hash');
	
	/* Constants
	-------------------------------*/
	this.CHECKOUT_LIVE_URL	= 'https://www.paypal.com/cgi-bin/webscr';
	this.CHECKOUT_TEST_URL	= 'https://www.sandbox.paypal.com/cgi-bin/webscr';
	
	this.CURRENCY			= 'USD';
	this.PAYMENT_ACTION		= 'SALE';
	this.CONTENT_TYPE		= 'application/x-www-form-urlencoded';
	
	this.PAYMENTREQUEST_AMT				= 'PAYMENTREQUEST_[:key]_AMT';
	this.PAYMENTREQUEST_PAYMENT_ACTION	= 'PAYMENTREQUEST_[:key]_PAYMENTACTION';
	this.PAYMENTREQUEST_CURRENCY_CODE	= 'PAYMENTREQUEST_[:key]_CURRENCYCODE';
	this.PAYMENTREQUEST_ITEM_AMT		= 'PAYMENTREQUEST_[:key]_ITEMAMT';
	this.PAYMENTREQUEST_SHIPPINGAMT		= 'PAYMENTREQUEST_[:key]_SHIPPINGAMT';
	this.PAYMENTREQUEST_INSURANCEAMT	= 'PAYMENTREQUEST_[:key]_INSURANCEAMT';
	this.PAYMENTREQUEST_TAXAMT			= 'PAYMENTREQUEST_[:key]_TAXAMT';
	this.PAYMENTREQUEST_DESCRIPTION		= 'PAYMENTREQUEST_[:key]_DESC';
	this.PAYMENTREQUEST_INVOICE_NUMBER	= 'PAYMENTREQUEST_[:key]_INVNUM';
	this.PAYMENTREQUEST_NOTIFYURL		= 'PAYMENTREQUEST_[:key]_NOTIFYURL';
	this.PAYMENTREQUEST_NOTETOBUYER		= 'PAYMENTREQUEST_[:key]_NOTETOBUYER';
	
	this.L_PAYMENTREQUEST_ITEM_NAME			= 'L_PAYMENTREQUEST_[:key]_NAME[:order]';
	this.L_PAYMENTREQUEST_DESCRIPTION		= 'L_PAYMENTREQUEST_[:key]_DES[:order]';
	this.L_PAYMENTREQUEST_AMT				= 'L_PAYMENTREQUEST_[:key]_AMT[:order]';
	this.L_PAYMENTREQUEST_NUMBER			= 'L_PAYMENTREQUEST_[:key]_NUMBER[:order]';
	this.L_PAYMENTREQUEST_QTY				= 'L_PAYMENTREQUEST_[:key]_QTY[:order]';
	this.L_PAYMENTREQUEST_TAXAMT			= 'L_PAYMENTREQUEST_[:key]_TAXAMT[:order]';
	this.L_PAYMENTREQUEST_ITEMWEIGHTVALUE	= 'L_PAYMENTREQUEST_[:key]_ITEMWEIGHTVALUE[:order]';
	this.L_PAYMENTREQUEST_ITEMWEIGHTUNIT	= 'L_PAYMENTREQUEST_[:key]_ITEMWEIGHTUNIT[:order]';
	this.L_PAYMENTREQUEST_ITEMLENGTHVALUE	= 'L_PAYMENTREQUEST_[:key]_ITEMLENGTHVALUE[:order]';
	this.L_PAYMENTREQUEST_ITEMLENGTHUNIT	= 'L_PAYMENTREQUEST_[:key]_ITEMLENGTHUNIT[:order]';
	this.L_PAYMENTREQUEST_ITEMWIDTHVALUE	= 'L_PAYMENTREQUEST_[:key]_ITEMWIDTHVALUE[:order]';
	this.L_PAYMENTREQUEST_ITEMWIDTHUNIT		= 'L_PAYMENTREQUEST_[:key]_ITEMWIDTHUNIT[:order]';
	this.L_PAYMENTREQUEST_ITEMHEIGHTVALUE	= 'L_PAYMENTREQUEST_[:key]_ITEMHEIGHTVALUE[:order]';
	this.L_PAYMENTREQUEST_ITEMHEIGHTUNIT	= 'L_PAYMENTREQUEST_[:key]_ITEMHEIGHTUNIT[:order]';
	this.L_PAYMENTREQUEST_ITEMURL			= 'L_PAYMENTREQUEST_[:key]_ITEMURL[:order]';
	this.L_PAYMENTREQUEST_ITEMCATEGORY		= 'L_PAYMENTREQUEST_[:key]_ITEMCATEGORY[:order]';
	
	/* Public Properties
	-------------------------------*/
	/* Protected Properties
	-------------------------------*/
	this.__queryData		= [];
	this.__token			= null;
	this.__payerId			= null;
	
	/* Private Properties
	-------------------------------*/
	var __noop = function() {};

	/* Magic
	-------------------------------*/
	/* Public Methods
	-------------------------------*/
	/**
	 * Returns the token
	 *
	 * @return string
	 */
	this.getToken = function() {
		return this.__token;
	};
	
	/**
	 * Set the currency code
	 *
	 * @param int
	 * @param string
	 * @return this
	 */
	this.setCurrency = function(key, currency) {
		//argument test
		this.argument()
			.test(1, 'int')
			.test(2, 'string');
		
		//set the currency
		this.__queryData[this.PAYMENTREQUEST_CURRENCY_CODE
			.replace('[:key]', key)] = currency.toUpperCase();
		
		return this;
	};
	
	/**
	 * Set the insurance amount
	 *
	 * @param int
	 * @param int | float
	 * @return this
	 */
	this.setInsuranceAmount = function(key, amount) {
		//argument test
		this.argument()
			.test(1, 'int')
			.test(2, 'int', 'float');
		
		//set the insurance amount
		this.__queryData[this.PAYMENTREQUEST_INSURANCEAMT
			.replace('[:key]', key)] = amount;
		
		return this;
	
	};
	
	/**
	 * Set the invoice number. This is based on your invoice number
	 *
	 * @param int
	 * @param int | string
	 * @return this
	 */
	this.setInvoiceNumber = function(key, invoice) {
		//argument test
		this.argument()
			.test(1, 'int')
			.test(2, 'int', 'string');
		
		//set the invoice number
		this.__queryData[this.PAYMENTREQUEST_INVOICE_NUMBER
			.replace('[:key]', key)] = invoice;
		
		return this;
	};
	
	/**
	 * Set the item amount
	 *
	 * @param int
	 * @param int
	 * @param int | float
	 * @return this
	 */
	this.setItemAmount = function(key, order, amount) {
		//argument test
		this.argument()
			.test(1, 'int')
			.test(2, 'int')
			.test(3, 'int', 'float');
		
		//set the item amount
		this.__queryData[this.L_PAYMENTREQUEST_AMT
			.replace('[:key]', key)
			.replace('[:order]', order)] = amount;
		
		return this;
	};
	
	/**
	 * Set the item category
	 *
	 * @param int
	 * @param int
	 * @param string
	 * @return this
	 */
	this.setItemCategory = function(key, order, category) {
		//argument test
		this.argument()
			.test(1, 'int')
			.test(2, 'int')
			.test(3, 'undefined', 'string');
		
		//set the default category to Digital
		var value = 'Digital';
		
		//if the category is physical
		if(category != undefined && category.toUpperCase() == 'PHYSICAL') {
			value = 'Physical';
		}
		
		//set the item category
		this.__queryData[this.L_PAYMENTREQUEST_ITEMCATEGORY
			.replace('[:key]', key)
			.replace('[:order]', order)] = value;
		
		return this;
	};
	
	/**
	 * Set the item description
	 *
	 * @param int
	 * @param int
	 * @param string
	 * @return this
	 */
	this.setItemDescription = function(key, order, description) {
		//argument test
		this.argument()
			.test(1, 'int')
			.test(2, 'int')
			.test(3, 'string');
		
		//description must be less than 127 characters
		if(description.length > 127) {
			throw new error('Item Description must not exceed 127 characters');
		}
		
		//set the item description
		this.__queryData[this.L_PAYMENTREQUEST_DESCRIPTION
			.replace('[:key]', key)
			.replace('[:order]', order)] = description;
		
		return this;
	
	};
	
	/**
	 * Set the item height and unit
	 *
	 * @param int
	 * @param int
	 * @param int | float
	 * @param string
	 * @return this
	 */
	this.setItemHeightValue = function(key, order, height, unit) {
		//argument test
		this.argument()
			.test(1, 'int')
			.test(2, 'int')
			.test(3, 'int', 'float')
			.test(4, 'string');
		
		//set the item height value
		this.__queryData[this.L_PAYMENTREQUEST_ITEMHEIGHTVALUE
			.replace('[:key]', key)
			.replace('[:order]', order)] = height;
			
		//set the item height unit
		this.__queryData[this.L_PAYMENTREQUEST_ITEMHEIGHTUNIT
			.replace('[:key]', key)
			.replace('[:order]', order)] = unit;
		
		return this;
	};
	
	/**
	 * Set the item ID
	 *
	 * @param int
	 * @param int
	 * @param int | string
	 * @return this
	 */
	this.setItemId = function(key, order, number) {
		//argument test
		this.argument()
			.test(1, 'int')
			.test(2, 'int')
			.test(3, 'int', 'string');
		
		//number must be less than 127 characters
		if(number.length > 127) {
			throw new error('Item ID must not exceed 127 characters');
		}
		
		//set the item ID
		this.__queryData[this.L_PAYMENTREQUEST_NUMBER
			.replace('[:key]', key)
			.replace('[:order]', order)] = number;
		
		return this;
	};
	
	/**
	 * Set the item length and unit
	 *
	 * @param int
	 * @param int
	 * @param int | float
	 * @param string
	 * @return this
	 */
	this.setItemLengthValue = function(key, order, length, unit) {
		//argument test
		this.argument()
			.test(1, 'int')
			.test(2, 'int')
			.test(3, 'int', 'float')
			.test(4, 'string');
		
		//set the item length value
		this.__queryData[this.L_PAYMENTREQUEST_ITEMLENGTHVALUE
			.replace('[:key]', key)
			.replace('[:order]', order)] = length;
			
		//set the item length unit
		this.__queryData[this.L_PAYMENTREQUEST_ITEMLENGTHUNIT
			.replace('[:key]', key)
			.replace('[:order]', order)] = unit;
		
		return this;
	};
	
	/**
	 * Set the item name
	 *
	 * @param int
	 * @param int
	 * @param string
	 * @return this
	 */
	this.setItemName = function(key, order, name) {
		//argument test
		this.argument()
			.test(1, 'int')
			.test(2, 'int')
			.test(3, 'string');
			
		//set the item name
		this.__queryData[this.L_PAYMENTREQUEST_ITEM_NAME
			.replace('[:key]', key)
			.replace('[:order]', order)] = name;
		
		return this;
	};
	
	/**
	 * Set the item quantity
	 *
	 * @param int
	 * @param int
	 * @param int
	 * @return this
	 */
	this.setItemQuantity = function(key, order, quantity) {
		//argument test
		this.argument()
			.test(1, 'int')
			.test(2, 'int')
			.test(3, 'int');
		
		//set the item quantity
		this.__queryData[this.L_PAYMENTREQUEST_QTY
			.replace('[:key]', key)
			.replace('[:order]', order)] = quantity;
		
		return this;
	};
	
	/**
	 * Set the item tax amount
	 *
	 * @param int
	 * @param int
	 * @param int | float
	 * @return this
	 */
	this.setItemTaxAmount = function(key, order, amount) {
		//argument test
		this.argument()
			.test(1, 'int')
			.test(2, 'int')
			.test(3, 'int', 'float');
		
		//set the item tax amount
		this.__queryData[this.L_PAYMENTREQUEST_TAXAMT
			.replace('[:key]', key)
			.replace('[:order]', order)] = amount;
		
		return this;
	};
	
	/**
	 * Set the total amount of the items per payment
	 *
	 * @param int
	 * @param int | float
	 * @return this
	 */
	this.setItemTotalAmount = function(key, amount) {
		//argument test
		this.argument()
			.test(1, 'int')
			.test(2, 'int', 'float');
		
		//set the item total amount
		this.__queryData[this.PAYMENTREQUEST_ITEM_AMT
			.replace('[:key]', key)] = amount;
		
		return this;
	};
	
	/**
	 * Set the item url
	 *
	 * @param int
	 * @param int
	 * @param url
	 * @return this
	 */
	this.setItemUrl = function(key, order, url) {
		//argument test
		this.argument()
			.test(1, 'int')
			.test(2, 'int')
			.test(3, 'url');
		
		//set the item url
		this.__queryData[this.L_PAYMENTREQUEST_ITEMURL
			.replace('[:key]', key)
			.replace('[:order]', order)] = url;
		
		return this;
	};
	
	/**
	 * Set the item weight and unit
	 *
	 * @param int
	 * @param int
	 * @param int | float
	 * @param string
	 * @return this
	 */
	this.setItemWeightValue = function(key, order, weight, unit) {
		//argument test
		this.argument()
			.test(1, 'int')
			.test(2, 'int')
			.test(3, 'int', 'float')
			.test(4, 'string');
		
		//set the item weight value
		this.__queryData[this.L_PAYMENTREQUEST_ITEMWEIGHTVALUE
			.replace('[:key]', key)
			.replace('[:order]', order)] = weight;
			
		//set the item weight unit
		this.__queryData[this.L_PAYMENTREQUEST_ITEMWEIGHTUNIT
			.replace('[:key]', key)
			.replace('[:order]', order)] = unit;
		
		return this;
	};
	
	/**
	 * Set the item width and unit
	 *
	 * @param int
	 * @param int
	 * @param int | float
	 * @param string
	 * @return this
	 */
	this.setItemWidthValue = function(key, order, width, unit) {
		//argument test
		this.argument()
			.test(1, 'int')
			.test(2, 'int')
			.test(3, 'int', 'float')
			.test(4, 'string');
		
		//set the item width value
		this.__queryData[this.L_PAYMENTREQUEST_ITEMWIDTHVALUE
			.replace('[:key]', key)
			.replace('[:order]', order)] = width;
			
		//set the item width unit
		this.__queryData[this.L_PAYMENTREQUEST_ITEMWIDTHUNIT
			.replace('[:key]', key)
			.replace('[:order]', order)] = unit;
		
		return this;
	};
	
	/**
	 * Set a note to the buyer
	 *
	 * @param int
	 * @param string
	 * @return this
	 */
	this.setNoteToBuyer = function(key, note) {
		//argument test
		this.argument()
			.test(1, 'int')
			.test(2, 'string');
		
		//if the note is greater than 165 length
		if(note.length > 165) {
			throw new error('Buyer\'s note must not exceed to 165 characters');
		}
		
		//set the note to the buyer
		this.__queryData[this.PAYMENTREQUEST_NOTETOBUYER
			.replace('[:key]', key)] = note;
		
		return this;
	};
	
	/**
	 * Set the notify url. This applies only to DoExpressCheckoutPayment
	 *
	 * @param int
	 * @param url
	 * @return this
	 */
	this.setNotifyUrl = function(key, url) {
		//argument test
		this.argument()
			.test(1, 'int')
			.test(2, 'url');
			
		//set the notify URL
		this.__queryData[this.PAYMENTREQUEST_NOTIFYURL
			.replace('[:key]', key)] = url;
		
		return this;
	};
	
	/**
	 * Set the payer ID
	 *
	 * @param string
	 * @return this
	 */
	this.setPayerId = function(id) {
		//argument test
		this.argument().test(1, 'string')
			
		this.__payerId = id;
		
		return this;
	};
	
	/**
	 * Set the payment action
	 *
	 * @param int
	 * @param string
	 * @return this
	 */
	this.setPaymentAction = function(key, action) {
		//argument test
		this.argument()
			.test(1, 'int')
			.test(2, 'string');
		
		//push the payment action
		this.__queryData[this.PAYMENTREQUEST_PAYMENT_ACTION
			.replace('[:key]', key)] = action.toUpperCase();
		
		return this;
	};
	
	/**
	 * Set the payment description
	 *
	 * @param int
	 * @param string
	 * @return this
	 */
	this.setPaymentDescription = function(key, description) {
		//argument test
		this.argument()
			.test(1, 'int')
			.test(2, 'string');
		
		//push the payment description
		this.__queryData[this.PAYMENTREQUEST_DESCRIPTION
			.replace('[:key]', key)] = description;
		
		return this;
	};
	
	/**
	 * Sets the shipping amount
	 *
	 * @param int
	 * @param int | float
	 * @return this
	 */
	this.setShippingAmount = function(key, amount) {
		//argument test
		this.argument()
			.test(1, 'int')
			.test(2, 'int', 'float');
		
		//set the shipping amount
		this.__queryData[this.PAYMENTREQUEST_SHIPPINGAMT
			.replace('[:key]', key)] = amount;
		
		return this;
	};
	
	/**
	 * Sets the tax amount
	 *
	 * @param int
	 * @param int | float
	 * @return this
	 */
	this.setTaxAmount = function(key, amount) {
		//argument test
		this.argument()
			.test(1, 'int')
			.test(2, 'int', 'float');
		
		//set the tax amount
		this.__queryData[this.PAYMENTREQUEST_TAXAMT
			.replace('[:key]', key)] = amount;
		
		return this;
	};
	
	/**
	 * Sets the token and can return the checkout url
	 *
	 * @param string
	 * @param boolean
	 * @return this
	 */
	this.setToken = function(token, returnUrl) {
		//argument test
		this.argument()
			.test(1, 'string')
			.test(2, 'undefined', 'boolean');
		
		//set the token
		this.__token = token;
		
		//check which checkout url to use
		var url = this.CHECKOUT_LIVE_URL;
		if(!this.__isLive) {
			url = this.CHECKOUT_TEST_URL;
		}
		
		//if returnUrl is true, let's give the url
		if(returnUrl) {
			var query = {
				cmd: '_express-checkout',
				token: token
			};
			
			//generate the checkout url
			return url + '?' + hash().toQuery(query);
		}
		
		return this;
	};
	
	/**
	 * Set the total amount
	 *
	 * @param int
	 * @param int | float
	 * @return this;
	 */
	this.setTotalAmount = function(key, amount) {
		//argument test
		this.argument()
			.test(1, 'int')
			.test(2, 'int', 'float');
		
		//push the total amount
		this.__queryData[this.PAYMENTREQUEST_AMT
			.replace('[:key]', key)] = amount;
		
		return this;
	};
	
	/* Response
	-------------------------------*/
	/**
	 * Completes the Express Checkout transaction
	 *
	 * @param function
	 * @return this
	 */
	this.capturePayment = function(callback) {
		//argument must be a function
		this.argument().test(1, 'function');
		
		//set the default query
		this.__queryData['METHOD']		= 'DoExpressCheckoutPayment';
		this.__queryData['VERSION']		= this.__version;
		this.__queryData['USER']		= this.__username;
		this.__queryData['PWD']			= this.__password;
		this.__queryData['SIGNATURE']	= this.__secret;
		this.__queryData['TOKEN']		= this.__token;
		this.__queryData['PAYERID']		= this.__payerId;
		
		//get the query length
		var length = Buffer.byteLength(hash().toQuery(this.__queryData));
		
		rest()
			.setUrl(this.__baseUrl)
			.setHeaders('Content-Type', this.CONTENT_TYPE)
			.setHeaders('Content-length', length)
			.setMethod('POST')
			.setBody(hash().toQuery(this.__queryData))
			.getQueryResponse(callback.bind(this), 'utf8');
		
		return this;
	};
	
	/**
	 * Obtains information transaction
	 *
	 * @param function
	 * @return this
	 */
	this.getDetails = function(callback) {
		//argument must be a function
		this.argument().test(1, 'function');
		
		//set the default query
		this.__queryData['METHOD']		= 'GetExpressCheckoutDetails';
		this.__queryData['VERSION']		= this.__version;
		this.__queryData['USER']		= this.__username;
		this.__queryData['PWD']			= this.__password;
		this.__queryData['SIGNATURE']	= this.__secret;
		this.__queryData['TOKEN']		= this.__token;
		
		//get the query length
		var length = Buffer.byteLength(hash().toQuery(this.__queryData));
		
		rest()
			.setUrl(this.__baseUrl)
			.setHeaders('Content-Type', this.CONTENT_TYPE)
			.setHeaders('Content-length', length)
			.setMethod('POST')
			.setBody(hash().toQuery(this.__queryData))
			.getQueryResponse(callback.bind(this), 'utf8');
		
		return this;
	};
	
	/**
	 * Sets up the Express Checkout transaction
	 *
	 * @param url
	 * @param url
	 * @param function
	 * @return this
	 */
	this.getResponse = function(successUrl, cancelUrl, callback) {
		//argument 1 must be a url
		//argument 2 must be a url
		//argument 3 must be a function
		this.argument()
			.test(1, 'url')
			.test(2, 'url')
			.test(3, 'function');
		
		//set the default query
		this.__queryData['METHOD']		= 'SetExpressCheckout';
		this.__queryData['VERSION']		= this.__version;
		this.__queryData['USER']		= this.__username;
		this.__queryData['PWD']			= this.__password;
		this.__queryData['SIGNATURE']	= this.__secret;
		this.__queryData['returnUrl']	= successUrl;
		this.__queryData['cancelUrl']	= cancelUrl;
		
		//get the query length
		var length = Buffer.byteLength(hash().toQuery(this.__queryData));
		
		rest()
			.setUrl(this.__baseUrl)
			.setHeaders('Content-Type', this.CONTENT_TYPE)
			.setHeaders('Content-length', length)
			.setMethod('POST')
			.setBody(hash().toQuery(this.__queryData))
			.getQueryResponse(callback.bind(this), 'utf8');
		
		return this;
	};
	
	/* Protected Methods
	-------------------------------*/
	/* Private Methods
	-------------------------------*/
}).register('eden/paypal/checkout');