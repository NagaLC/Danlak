const Discord = require('discord.js');

const emoji_banana = ":banana:"
const emoji_monkey = ":monkey_face:"

function dateColor(day_order) {
    if (day_order < 0 || day_order > 8) {
        day_order = 0;
    }
    let color = [
      'RANDOM',
      'NAVY',
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
            .setDescription(cours.description)
            .addField(cours.afficherDate(), cours.afficherHeureMinute(), true)
            .setFooter(cours.salle);
        return embed;
	}

  static hello() {
    return "Bonjour je m'appelle Discal. Mon créateur s'appelle Naga. C'est un jeune africain qui aime les bananes comme tous les af.. aimeurs de bananes. Bon passons, ce n'est pas de lui dont on parle, mais de moi. Je suis un bot capable d'enregistrer un fichier icalendar. Une fois le fichier enregistré sur ton serveur, j'affiche les évènements grâce aux commandes disponibles `!help`. J'ai été conçu pour afficher les cours des emplois du temps de l'IUT de Montpellier. Je ne suis qu'une première version donc soyez indulgent svp. En vu de m'améliorer, libre à vous de contacter Naga peut être il vous répondra entre 2-3 bananes...";
  }

};