const didi = require('./../lib/LibDiscord');

module.exports = {
    name: 'hello',
    description: `Salut Danlak !`,
    args: false,
    aliases: ['hi'],
    execute (message, args) {
        message.reply(didi.hello());
    }
};