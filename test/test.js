var Tps = require('../tps-monitor');
var tps = new Tps();


setInterval(function(){
	tps.update(1, null, function(cur_tps){
		console.log("current tps=", cur_tps);
	});
}, 100);