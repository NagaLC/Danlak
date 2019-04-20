const utility = require('./../lib/LibDiscord');

module.exports = {
    name: 'hello',
    description: `Salut Discal !`,
    args: false,
    aliases: ['hi'],
    execute (message, args) {
        message.reply(utility.hello());
    }
};