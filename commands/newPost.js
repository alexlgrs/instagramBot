module.exports.command = async (ig, message) => {
    const func = require("../utils/functions")
    const running = require("../databases/running.json")

    const args = message.content.replace("newPost", "").trim().split(" ")
    
    running["waitingPost"] = {
      caption: args.join(" "),
      status: true,
      user: await message.author.id,
    };

    func.sendRunning("Description enregistrée, veuillez envoyer l'image", message);
}

exports.help = {
    "name": "newPost",
    "desc": "Permet de poster quelque chose avec le bot.",
    "usage": "newPost [Description du post]",
    "example": "newPost Coucou nouveau post ! #marrant"
}