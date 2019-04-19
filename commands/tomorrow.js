const Controller = require('./../controller/Controller');
const ical = require('node-ical');
const libDate = require('./../lib/LibDate');
const didi = require('./../lib/LibDiscord');
const control = new Controller();

module.exports = {
    name: 'tomorrow',
    description: `Affiche la liste des cours qui auront lieu demain.`,
    args: false,
    aliases: ['tm'],
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
                let tomorrow = libDate.tomorrow();
                let result = control.listeCoursParDate(tomorrow);
                let bFound = false;
                result.forEach( (cours, key) => {
                    let tempEmbed = didi.getEmbed(cours);
                    message.channel.send(tempEmbed);
                    bFound = true;
                });
                if (!bFound) {
                    message.channel.send("Pas de cours pour la date donnée : "+ tomorrow);          
                }
                return true;
            });
        });
        return false;
    }
};