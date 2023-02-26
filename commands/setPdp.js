module.exports.command = async (ig, message) => {
    const func = require("../utils/functions")
    const running = require("../databases/running.json")

    running["waitingPdp"] = {
      status: true,
      user: await message.author.id,
    };

    func.sendRunning("En attente de l'image", message);
}

exports.help = {
    "name": "setPdp",
    "desc": "Permet de changer la photo de profil du bot.",
    "usage": "setPdp",
    "example": "setPdp"
}