const ical = require('node-ical');
const fs = require('fs');
const extension = ".ics";

function getPromise(state, str) {
    var promise = new Promise(function(resolve, reject) {
        if (state) {
            resolve(str);
        } else {
            reject(str);
    }
    });
    return promise;
}

module.exports = {
    name: 'set',
    description: 'Set the file.',
    args: false,
    usage: '<attachment>',
    cooldown: 5,
    async execute (message, args) {
        let guildId = message.guild.id;
        var next = false;
        var data = null;

        // Attendre qu'un fichier soit envoyé
    	await message.channel.send("En attente du fichier .ics");
    	const collection_msg = await message.channel.awaitMessages( msg => {
    		return msg.attachments;
    	}, {time: 10000}); // Timer d'attente en millisecondes
    	let url = collection_msg.map( msg => msg.attachments.first().url).join(', ');
        let fileName = collection_msg.map( msg => msg.attachments.first().filename).join(', ');
		let fileExtension = "." + fileName.split(".")[1];
		
        if (!url.startsWith('https')) {
            let res = `Aucun fichier envoyé.`;
            message.channel.send(res);
            return getPromise(next, res).then( value => {
                console.log(value);
            }).catch(console.error);
        }

        if (fileExtension != extension) {
            let res = `L'extension n'est pas du ${extension}.`;
            message.channel.send(res);
            return getPromise(next, res).then( value => {
                console.log(value);
            }).catch(console.error);
        }

        ical.fromURL(url, {}, function(err, content) {
            if (err) throw err;
            data = content;
            next = true;
        });
        // async => sync
        while (!next) {
            require('deasync').sleep(100);
        }

        // Datas récupérer sauvegarder dans le .json
        let jsonFile = require('./../ics.json');
        jsonFile[guildId] = {
            content: data
        };
        fs.writeFile('./ics.json', JSON.stringify(jsonFile, null, 4), err => {
            if(err) throw err;
            message.channel.send("Fichier sauvegardé !");
        });

        return getPromise(next, "All is fine").then( value => {
            console.log(value);
        }).catch(console.error);
    }
};