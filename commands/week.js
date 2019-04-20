const Controller = require('./../controller/Controller');
const utility = require('./../lib/LibDiscord');

module.exports = {
    name: 'week',
    description: `Affiche la liste des cours de la semaine.`,
    args: false,
    aliases: ['semaine', 'wk'],
    cooldown: 5,
    execute (message, args) {
        let guildId = message.guild.id;
        let control = new Controller();
        control.getEvent(guildId, "week", (err, result) => {
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