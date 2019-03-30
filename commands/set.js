const ical = require('node-ical');
const fs = require('fs');
const extension = ".ics";

module.exports = {
    name: 'set',
    description: 'Set the file.',
    args: false,
    usage: '<attachment>',
    cooldown: 5,
    async execute (message, args) {
    	await message.channel.send("En attente du fichier .ics");

    	const collection_msg = await message.channel.awaitMessages( msg => {
    		return msg.attachments;
    	}, {time: 10000});

    	let url = collection_msg.map( msg => msg.attachments.first().url).join(', ');
		
		var data = null;
		var next = false;
    	ical.fromURL(url, {}, function(err, content) {
		    if (err) throw err;
		   	data = content;
		   	next = true;
		});
    	while (!next) {
    		require('deasync').sleep(100);
    	}

        // Ici nous avons récupérer les datas à partir du fichier .ics

        let jsonFile = require('./../ics.json');

        let txtToSave = data;

        jsonFile.file = {
            content: txtToSave
        };
        fs.writeFile('./ics.json', JSON.stringify(jsonFile, null, 4), err => {
            if(err) throw err;
            message.channel.send("Traitement terminé");
        });

        var promise = new Promise(function(resolve, reject) {
        if (next) {
            resolve("All is fine");
        } else {
            reject("Error during set");
        }
        });
		return promise;
    }
};