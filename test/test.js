var Tps = require('../tps-monitor');
var tps = new Tps();


setInterval(function(){
	console.log(tps.update(1));
}, 100);