(function() {
	"use strict";

	var TpsMonitor = function(config) {

		var self = this;

		if(!config) config = {};

		var Memcached = require('memcached');
		var uuid 	  = require('uuid');
		var memcached = new Memcached(config.memcached || "127.0.0.1:11211");

		var generic_key = uuid.v4();

		self.update = function(value, key, cb)
		{	
			// if only the value is specified, use the generic key
			if(!key)
			{
				key = generic_key;
			}

			// check if the key already exists
			memcached.get(key, function (err, data) {

			  // if it doesn't exist, create a new one
			  if(!data)
			  {
			  	// let's set it, lifetime is just one second
			  	memcached.set(key, value, 1, function (err) {

			  		// return the value
					cb(value);
				});
			  }
			  // if key already exists
			  else
			  {
				 memcached.incr(key, value, function (err) {
				 	cb(data + value);
				 });  	
			  }
			});
		}
	};

	module.exports = TpsMonitor;
})();