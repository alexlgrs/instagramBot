module.exports.command = async (ig, message) => {
    const func = require("../utils/functions")
    let now = Date.now()
    message.reply("Pong ! 🏓\nLatence : " + (Date.now() - now) + "ms")
}

exports.help = {
    "name": "ping",
    "desc": "Permet de récupérer la latence du bot.",
    "usage": "ping",
    "example": "ping"
}