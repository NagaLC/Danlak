const utility = require('./../lib/LibDiscord');
const Controller = require('./../controller/Controller');

module.exports = {
    name: 'date',
    description: `Affiche les cours de la date passée en paramètre dans l'ordre chronologique.
    Si aucun mois et aucune année ne sont passés en paramètres, la commande prendra le jour du mois en cours.`,
    args: true,
    aliases: ['d'],
    usage: '<jour> <mois>? <année>? ex : 4 4 1998',
    cooldown: 5,
    execute (message, args) {
        let guildId = message.guild.id;
        let today = new Date();
        let month = today.getMonth()+1; // 0 à 11 or je veux 1 à 12
        let year = today.getFullYear();
        if (args[1] !== undefined) month = args[1];
        if (args[2] !== undefined) year = args[2];
        let control = new Controller();
        control.getDateEvent(guildId, year, month, args[0], (err, result) => {
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