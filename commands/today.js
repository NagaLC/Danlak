const Controller = require('./../controller/Controller');
const ical = require('node-ical');
const libDate = require('./../lib/LibDate');
const didi = require('./../lib/LibDiscord');
const control = new Controller();

module.exports = {
    name: 'today',
    description: `Affiche la liste des cours qui ont lieu aujourd'hui.`,
    args: false,
    aliases: ['td', 'ls'],
    cooldown: 5,
    execute (message, args) {
        const { connexion } = message.client;
        let guildId = message.guild.id;
        console.log(guildId);
        let sql = "SELECT content AS url FROM event WHERE guildId = ?";
        connexion.query(sql, guildId, function (err, result) {
            if (err) throw err;
            if (result[0] === undefined) {
                message.channel.send("Je ne trouve pas de données sur votre serveur\nPensez à `!set` votre fichier.ics.");
                return false;
            }
            console.log(result);
            let url = result[0].url;
            console.log(url);
            ical.fromURL(url, {}, function(err, content) {
                control.chargerData(content);
                let today = libDate.today();
                let result = control.listeCoursParDate(today);
                let bFound = false;
                result.forEach( (cours, key) => {
                    let tempEmbed = didi.getEmbed(cours);
                    message.channel.send(tempEmbed);
                    bFound = true;
                });
                if (!bFound) {
                    message.channel.send("Pas de cours pour la date donnée : "+ today);          
                }
                return true;
            });
        });
        return false;
    }
};