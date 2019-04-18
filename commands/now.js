const Controller = require('./../controller/Controller');
const ical = require('node-ical');
const jsonFile = require('./../ics.json');
const didi = require('./../lib/LibDiscord');
const control = new Controller();

module.exports = {
    name: 'now',
    description: `Affiche le cours qui a lieu maintenant. Si aucun cours n'a lieu actuellement,
    affiche le prochain cours qui aura lieu.`,
    args: false,
    aliases: ['maintenant'],
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
                let cours = control.prochainCours();
                if (cours===undefined) {
                    message.channel.send("Je n'arrive pas à trouver le prochain cours qui doit avoir lieu !");
                    return false;
                }       
                let tempEmbed = didi.getEmbed(cours);
                message.channel.send(tempEmbed);
                return true;
            });
        });
    }
};