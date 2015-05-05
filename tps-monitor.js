(function() {
	"use strict";

	var TpsMonitor = function(config) {

		var self = this;

		if(!config) config = {};

		var uuid 	  = require('uuid');
		var _ 		  = require('lodash');
		
		var generic_key = uuid.v4();


		var transactions = {};


		self.update = function(value, key)
		{	
			// if only the value is specified, use the generic key
			if(!key)
			{
				key = generic_key;
			}

			// default to 1
			if(!value)
			{
				value = 1;
			}

			if(!transactions[key])
				transactions[key] = value;
			else
				transactions[key] += value;

			return transactions[key];
		}

		// clear transactions
		self.clear = function()
		{
			_.each(transactions, function(v, k){
				transactions[k] = 0;
			});
		}

		setInterval(self.clear, 1000);
	};

	module.exports = TpsMonitor;
})();