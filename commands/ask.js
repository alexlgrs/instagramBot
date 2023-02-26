module.exports.command = async (ig, message) => {
    const func = require("../utils/functions")
    
    const args = message.content.replace("ask", "").trim().split(" ")

    if(args.length == 0) return func.sendError("Vous devez préciser la question à poser !", message)

    let response = await func.runCompletion(args.join(' '))
    await message.reply(response)
}

exports.help = {
    "name": "ask",
    "desc": "Permet de poser une question ouverte.",
    "usage": "ask [Question]",
    "example": "ask Quelle est la recette du hachis parmentier ?"
}