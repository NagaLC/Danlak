const Controller = require('./../controller/Controller');
const jsonFile = require('./../ics.json');
const libDate = require('./../lib/LibDate');
const control = new Controller();

module.exports = {
    name: 'yesterday',
    description: 'Set the file.',
    args: false,
    aliases: ['ys'],
    cooldown: 5,
    execute (message, args) {
        let guildId = message.guild.id;
        let index = jsonFile[guildId];
        if (index === undefined) {
            message.channel.send("Je ne trouve pas de données sur votre serveur\nPensez à `!set` votre fichier.ics.");
            return false;
        }

     	control.chargerData(index.content);
     	let yesterday = libDate.yesterday();
     	let result = control.listeCoursParDate(yesterday);
        let parse = "";
     	result.forEach( (cours, key) => {
            parse += "\n" + cours.nom;
        });
        if (parse !== "") {
            message.channel.send(parse);
        } else {
            message.channel.send("Pas de cours pour la date donnée");          
        }
        return true;
    }
};