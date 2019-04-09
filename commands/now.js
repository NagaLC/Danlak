const Controller = require('./../controller/Controller');
const jsonFile = require('./../ics.json');
const didi = require('./../lib/LibDiscord');
const control = new Controller();

module.exports = {
    name: 'now',
    description: `Retourne le cours qui à lieu maintenant. Si aucun cours n'a lieu actuellement,
    retourne le prochain cours qui aura lieu.`,
    args: false,
    aliases: ['maintenant'],
    cooldown: 5,
    execute (message, args) {
        let guildId = message.guild.id;
        let index = jsonFile[guildId];
        if (index === undefined) {
            message.channel.send("Je ne trouve pas de données sur votre serveur\nPensez à `!set` votre fichier.ics.");
            return false;
        }
        control.chargerData(index.content);
        let cours = control.prochainCours();
        if (cours===undefined) {
            message.channel.send("Je n'arrive pas à trouver le prochain cours qui doit avoir lieu !");
            return false;
        }       
        let tempEmbed = didi.getEmbed(cours);
        message.channel.send(tempEmbed);
        return true;

    }
};