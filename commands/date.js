const Controller = require('./../controller/Controller');
const ical = require('node-ical');
const jsonFile = require('./../ics.json');
const libDate = require('./../lib/LibDate');
const didi = require('./../lib/LibDiscord');
const control = new Controller();

module.exports = {
    name: 'date',
    description: `Affiche les cours de la date passée en paramètre dans l'ordre chronologique.
    Si aucun mois et aucune année ne sont passés en paramètres, la commande prendra le jour du mois en cours.`,
    args: true,
    aliases: ['d'],
    usage: '<jour> <mois>? <année>? ex : 4 4 1998',
    cooldown: 5,
    execute (message, args) {
        const { connexion } = message.client;
        let guildId = message.guild.id;
        let sql = "SELECT content AS url FROM event WHERE guildId = ?";
        connexion.query(sql, guildId, function (err, result) {
            if (err) throw err;
            if (result[0] === undefined) {
                message.channel.send("Je ne trouve pas de données sur votre serveur\nPensez à `!set` votre fichier.ics.");
                return false;
            }
            let url = result[0].url;
            ical.fromURL(url, {}, function(err, content) {
                if (err) throw err;
                control.chargerData(content);
                let today = new Date();
                let month = today.getMonth()+1; // 0 à 11 or je veux 1 à 12
                let year = today.getFullYear();
                if (args[1] !== undefined) month = args[1];
                if (args[2] !== undefined) year = args[2];
                let date = libDate.giveMe(year, month, args[0]);
                let result = control.listeCoursParDate(date);
                let bFound = false;
                result.forEach( (cours, key) => {
                    let tempEmbed = didi.getEmbed(cours);
                    message.channel.send(tempEmbed);
                    bFound = true;
                });
                if (!bFound) {
                    message.channel.send("Pas de cours pour la date donnée : "+ date);          
                }
                return true;
            });
        });
        return false;
    }
};