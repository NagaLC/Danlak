const utility = require('./../lib/LibDiscord');
const Controller = require('./../controller/Controller');

module.exports = {
    name: 'tomorrow',
    description: `Affiche la liste des cours qui auront lieu demain.`,
    args: false,
    aliases: ['tm'],
    cooldown: 5,
    execute (message, args) {
        let guildId = message.guild.id;
        let control = new Controller();
        control.getEvent(guildId, "tomorrow", (err, result) => {
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