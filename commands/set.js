function validURL(url) {
    return url.startsWith('https');
}

function checkExtension(fileExtension) {
    const array = [ "ics" ];
    return array.indexOf(fileExtension) != -1;
} 

module.exports = {
    name: 'set',
    description: `Permet d'enregistrer l'emploi du temps au format .ics`,
    args: false,
    usage: 'Parcous les 10 derniers messages et sauvegarde le premier fichier trouvé. Ce fichier doit être au format ics.',
    cooldown: 5,
    execute (message, args) {
        message.channel.fetchMessages({ limit: 10 })
        .then(messages => {
            let attachmentFound = false;
            for (let [key, msg] of messages) {
                if(!msg.author.bot) {
                    let attachment = msg.attachments.first();
                    if (attachmentFound === true) return;
                    if (attachment !== undefined) {
                        let url = attachment.url;
                        let extension = attachment.filename.split(".")[1];
                        
                        if (!validURL(url)) {
                            let res = `Aucun fichier envoyé.`;
                            message.channel.send(res);
                            return;
                        }

                        if (!checkExtension(extension)) {
                            let res = `L'extension n'est pas du ${extension}.`;
                            message.channel.send(res);
                            return;
                        }

                        let guildId = msg.guild.id;
                        
                        attachmentFound = true;
                        let dao = require("./../dao/DaoEvent");
                        dao.count(guildId, (nb) => {
                            if (nb === 0) {
                                dao.create(guildId, url, () => {
                                    message.channel.send("J'ai bien enregistré votre fichier : "+attachment.filename);
                                });
                            } else {
                                dao.update(guildId, url, () => {
                                    message.channel.send("J'ai bien enregistré votre fichier : "+attachment.filename);
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