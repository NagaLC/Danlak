const Controller = require('./../controller/Controller');
const jsonFile = require('./../ics.json');
const libDate = require('./../lib/LibDate');
const didi = require('./../lib/LibDiscord');
const control = new Controller();

module.exports = {
    name: 'yesterday',
    description: `Affiche la liste des cours qui ont eu lieu hier.`,
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
        let bFound = false;
     	result.forEach( (cours, key) => {
            let tempEmbed = didi.getEmbed(cours);
            message.channel.send(tempEmbed);
            bFound = true;
        });
        if (!bFound) {
            message.channel.send("Pas de cours pour la date donnée : "+ yesterday);          
        }
        return true;
    }
};