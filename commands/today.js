const Controller = require('./../controller/Controller');
const { file } = require('./../ics.json');
const libDate = require('./../lib/LibDate');
const control = new Controller();

module.exports = {
    name: 'today',
    description: 'Set the file.',
    args: false,
    aliases: ['ls'],
    usage: '<attachment>',
    cooldown: 5,
    execute (message, args) {

     	control.chargerData(file.content);
     	let today = libDate.today();
     	let result = control.listeCoursParDate(today);

     	console.log(result);

    }
};