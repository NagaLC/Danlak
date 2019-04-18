const fs = require('fs');
const extension = ".ics";

function getPromise(state, str) {
    var promise = new Promise(function(resolve, reject) {
        if (state) {
            resolve(str);
        } else {
            reject(str);
    }
    });
    return promise;
}

module.exports = {
    name: 'set',
    description: `Permet d'enregistrer l'emploi du temps au format .ics`,
    args: false,
    usage: ' => Après le \'!set\' vous avez 10 secondes pour transferer le fichier au format .ics (glisser - déposer).',
    cooldown: 5,
    execute (message, args) {
        const { connexion } = message.client;
        let guildId = message.guild.id;
        let channel = message.channel;
        // Get the last 10 messages in ordre to find the first attachment
        channel.fetchMessages({ limit: 10 })
        .then(messages => {
            let attachmentFound = false;
            for (let [key, msg] of messages) {
                if(!msg.author.bot) {
                    let attachment = msg.attachments.first();
                    if (attachmentFound === true) return;
                    if (attachment !== undefined) {
                        let url = attachment.url;
                        let fileExtension = "." + attachment.filename.split(".")[1];
                        if (!url.startsWith('https')) {
                            let res = `Aucun fichier envoyé.`;
                            message.channel.send(res);
                            return;
                        }

                        if (fileExtension != extension) {
                            let res = `L'extension n'est pas du ${extension}.`;
                            message.channel.send(res);
                            return;
                        }

                        attachmentFound = true;

                        let count = "SELECT COUNT(*) AS nb FROM event WHERE guildId = ?";
                        connexion.query(count, guildId, function (err, result) {
                            if (err) throw err;
                            if (result[0].nb == 0) {
                                let sql = "INSERT INTO event (guildId, content) VALUES ?";
                                let values = [
                                    [guildId, url]
                                ];
                                connexion.query(sql,[values], function (err, result) {
                                    if (err) throw err;
                                    console.log("event enregistrer");
                                });
                            } else {
                                let sql = "UPDATE event SET content = ? WHERE guildId = ?";
                                let data = [url,guildId];
                                connexion.query(sql, data, function (err, result) {
                                    if (err) throw err;
                                    console.log("event modifier");
                                });
                            }
                        });
                        return;
                    }
                }
            }
        })
        .catch(console.error);
    }
};