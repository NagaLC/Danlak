const Controller = require('./../controller/Controller');
const jsonFile = require('./../ics.json');
const libDate = require('./../lib/LibDate');
const control = new Controller();

module.exports = {
    name: 'date',
    description: 'Set the file.',
    args: true,
    aliases: ['giveMe', 'gm'],
    usage: '<day> <month>? <year>?',
    cooldown: 5,
    execute (message, args) {
        let guildId = message.guild.id;
        let index = jsonFile[guildId];
        if (index === undefined) {
            message.channel.send("Je ne trouve pas de données sur votre serveur\nPensez à `!set` votre fichier.ics.");
            return false;
        }

        control.chargerData(index.content);

        let today = new Date();
        let month = today.getMonth()+1; // 0 à 11 or je veux 1 à 12
        let year = today.getFullYear();
        if (args[1] !== undefined) {
            month = args[1];
        }
        if (args[2] !== undefined) {
            year = args[2];
        }
        let date = libDate.giveMe(year, month, args[0]);
        let result = control.listeCoursParDate(date);
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