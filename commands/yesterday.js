const utility = require('./../lib/LibDiscord');
const Controller = require('./../controller/Controller');

module.exports = {
    name: 'yesterday',
    description: `Affiche la liste des cours qui ont eu lieu hier.`,
    args: false,
    aliases: ['ys'],
    cooldown: 5,
    execute (message, args) {
        let guildId = message.guild.id;
        let control = new Controller();
        control.getEvent(guildId, "yesterday", (err, result) => {
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