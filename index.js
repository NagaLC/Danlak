var fs = require('fs');
const ical = require('node-ical');

const Controller = require('./controller/ControllerCours');
const libDate = require('./lib/LibDate');

const extension = ".ics";
var filename = "A1_S3"+extension;

function showIcsDatas(str) {
	ical.parseICS(str, function(err, data) {
		if (err) console.log(err);
		let controller = new Controller();
		controller.chargerData(data);
		console.log(libDate.tomorrow());
	});
}

function readMyFile(filename) {
	fs.readFile(filename, 'utf8', function(err, str) {  
		if (err) throw err;
		showIcsDatas(str);	    
	});
}

readMyFile(filename);