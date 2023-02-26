module.exports.command = async (ig, message) => {
    const func = require("../utils/functions")
    const args = message.content.replace("voy", "").trim().split(" ")

    if(args.length == 0) return sendError("Veuillez poser une question !", message)
    
    let answers = ["Oui.", "Definitivement oui.", "Bien-sûr que oui !!!!", "Grave ^^", "HAHHAHAHA bah non", "Non.", "Evidemment que non t'es coco dingo", "Bah non man", "Peut-être..", "Je dirais pas ça comme ça mais.. oui", "Je dirais que oui", "Joker pomme de pin"]

    let answer = answers[Math.ceil(func.getRdm(0, answers.length - 1))]

    message.reply("🔮 Réponse de la voyante : 🪄\n" + answer)
}

exports.help = {
    "name": "voy",
    "desc": "Permet de poser une question fermée au bot.",
    "usage": "voy [Question]",
    "example": "voy Je vais avoir mon diplôme ?"
}