module.exports.command = async (ig, message) => {
    const func = require("../utils/functions")
    const {languages} = require("../utils/params")

    message.reply("LANGUES DISPONIBLES\n\n" + languages + "\n\n📖 Plus d'infos : help say")
}

exports.help = {
    "name": "languages",
    "desc": "Permet de voir la liste des langues utilisables pour la commande say.",
    "usage": "languages",
    "example": "languages"
}