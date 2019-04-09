const Controller = require('./../controller/Controller');
const jsonFile = require('./../ics.json');
const libDate = require('./../lib/LibDate');
const didi = require('./../lib/LibDiscord');
const control = new Controller();

module.exports = {
    name: 'week',
    description: `Renvoie la liste des cours de la semaine.
    /!\ la commande prend du temps car un parcours total du fichier est fait. `,
    args: false,
    aliases: ['semaine'],
    cooldown: 5,
    execute (message, args) {
        let guildId = message.guild.id;
        let index = jsonFile[guildId];
        if (index === undefined) {
            message.channel.send("Je ne trouve pas de données sur votre serveur\nPensez à `!set` votre fichier.ics.");
            return false;
        }
        control.chargerData(index.content);
        let result = control.listeCoursParSemaine();
        let bFound = false;
        result.forEach( (cours, key) => {
            let tempEmbed = didi.getEmbed(cours);
            message.channel.send(tempEmbed);
            bFound = true;
        });
        if (!bFound) {
            message.channel.send("Pas de cours pour la semaine en cours");          
        }
        return true;

    }
};