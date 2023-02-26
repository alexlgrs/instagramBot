module.exports.command = async (ig, message) => {
    const func = require("../utils/functions")
    const running = require("../databases/running.json")
    
    let args = content.replace(command, "").split("|")

    if(args.length < 2) return sendError("Commande incomplète", message)

    running["commands"][args[0].trim()] = args[1].trim()
    func.sendSucces("Réponse automatique enregistrée !", message)
}

exports.help = {
    "name": "res",
    "desc": "Permet d'enregistrer des réponses automatiques.",
    "usage": "res [question] | [reponse]",
    "example": "res Il va faire tout noir | Ta gueule"
}