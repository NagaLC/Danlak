const Discord = require('discord.js');

function dateColor(day_order) {
    if (day_order < 0 || day_order > 8) {
        day_order = 0;
    }
    let color = [
      'RANDOM',
      'AQUA',
      'GREEN',
      'GOLD',
      'PURPLE',
      'LUMINOUS_VIVID_PINK',
      'ORANGE',
      'RED'
    ];
    return color[day_order];
}

module.exports = class LibDiscord {

	static getEmbed(cours) {
		let embed = new Discord.RichEmbed()
            .setColor(dateColor(cours.dhDebut.order))
            .setTitle(cours.nom)
            .setDescription(cours.salle)
            .addField(cours.afficherDate(), cours.afficherHeureMinute(), true)
            .addField("Professeur", cours.professeur.nom+" "+cours.professeur.prenom, true)
            .setFooter(cours.classe);
        return embed;
	}

};