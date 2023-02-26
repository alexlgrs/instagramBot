module.exports.command = async (ig, message) => {
    const func = require("../utils/functions")

    const args = message.content.replace("setBio", "").trim().split(" ")

    if(args.length == 0) return func.sendError("Vous devez préciser la biographie.", message)

    ig.account.setBiography(args.join(' '));
    func.sendSucces("Biographie changée !", message);
}

exports.help = {
    "name": "setBio",
    "desc": "Permet de changer la biographie du bot.",
    "usage": "setBio [Nouvelle biographie]",
    "example": "setBio Salut je suis un bot génial"
}