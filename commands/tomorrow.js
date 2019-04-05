const Discord = require('discord.js');
const Controller = require('./../controller/Controller');
const jsonFile = require('./../ics.json');
const libDate = require('./../lib/LibDate');
const control = new Controller();

module.exports = {
    name: 'tomorrow',
    description: `Renvoie la liste des cours de demain.`,
    args: false,
    aliases: ['tm'],
    cooldown: 5,
    execute (message, args) {
        let guildId = message.guild.id;
        let index = jsonFile[guildId];
        if (index === undefined) {
            message.channel.send("Je ne trouve pas de données sur votre serveur\nPensez à `!set` votre fichier.ics.");
            return false;
        }
     	control.chargerData(index.content);
     	let tomorrow = libDate.tomorrow();
     	let result = control.listeCoursParDate(tomorrow);
        let bFound = false;
     	result.forEach( (cours, key) => {
            let tempEmbed = new Discord.RichEmbed()
                .setColor(libDate.dateColor(cours.dhDebut.order))
                .setTitle(cours.nom)
                .setDescription(cours.salle)
                .addField(cours.afficherDate(), cours.afficherHeureMinute(), true)
                .setFooter(cours.professeur.nom+" "+cours.professeur.prenom);
            message.channel.send(tempEmbed);
            bFound = true;
        });
        if (!bFound) {
            message.channel.send("Pas de cours pour la date donnée : "+ tomorrow);          
        }
        return true;
    }
};