const utility = require('./../lib/LibDiscord');
const Controller = require('./../controller/Controller');

module.exports = {
    name: 'now',
    description: `Affiche le cours qui a lieu maintenant. Si aucun cours n'a lieu actuellement,
    affiche le prochain cours qui aura lieu.`,
    args: false,
    aliases: ['maintenant'],
    cooldown: 5,
    execute (message, args) {
        let guildId = message.guild.id;
        let control = new Controller();
        control.getEvent(guildId, "now", (err, result) => {
            if (err) {
                message.channel.send(result);
                return;
            }
            for(let index in result) {
                message.channel.send(utility.getEmbed(result[index]));
            }
        });
    }
};