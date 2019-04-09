const { prefix } = require('./../config.json');

const bloc = String.fromCharCode(96);
const encapsulation = bloc + bloc + bloc;

module.exports = {
    name: 'help',
    description: 'Liste les commandes disponibles',
    aliases: ['commands'],
    usage: '[command name]',
    cooldown: 5,
    execute(message, args) {
        const data = [];
        const { commands } = message.client;
        let str = "";
        if (!args.length) {
            data.push(encapsulation);
            data.push("Voici la liste des commandes disposibles :");
            data.push(" - " + commands.map(command => command.name).join('\n - '));
            data.push(`\nPour plus de détails sur une commande => ${prefix}help [commande]`);
            data.push(encapsulation);
            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply("Je t'ai envoyé un message privé avec mes commandes !");
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply("Ah ?! Je ne parviens pas à t'envoyer un messag privé. Peut être ils sont désactivé ?");
                });
            
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('Commande incorrecte !');
        }
        data.push(`**Nom :** ${command.name}`);
        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`); 
        message.channel.send(data,{ split: true });

    },
};