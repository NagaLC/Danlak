const utility = require('./../lib/LibDiscord');
const Controller = require('./../controller/Controller');

module.exports = {
    name: 'today',
    description: `Affiche la liste des cours qui ont lieu aujourd'hui.`,
    args: false,
    aliases: ['td', 'ls'],
    cooldown: 5,
    execute (message, args) {
        let guildId = message.guild.id;
        let control = new Controller();
        control.getEvent(guildId, "today", (err, result) => {
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