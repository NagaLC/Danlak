const Controller = require('./../controller/Controller');
// const Cours = require('./../metier/Cours');
const { file } = require('./../ics.json');
const libDate = require('./../lib/LibDate');
const control = new Controller();

module.exports = {
    name: 'yesterday',
    description: 'Set the file.',
    args: false,
    aliases: ['ys'],
    usage: '<attachment>',
    cooldown: 5,
    execute (message, args) {

     	control.chargerData(file.content);
     	let yesterday = libDate.giveMe(2019,4,1);
        console.log(yesterday);
     	let result = control.listeCoursParDate(yesterday);
        let parse = ""
     	result.forEach( (cours, key) => {
            parse += "\n" + cours.nom;
        });
        if (parse !== "") {
            message.channel.send(parse);
        } else {
            message.channel.send("Pas de cours pour la date donnée");            
        }
    }
};