module.exports.command = async (ig, message) => {
    const func = require("../utils/functions")
    const args = message.content.trim().split(" ")

    let commandsList = func.getCommands()

    if(args.length == 1){
        let liste = ""
    
        for(command in commandsList) liste += "\n• " + commandsList[command].help.name
        
        let helpMenu = "Liste des commandes : \n" + liste + "\n\n📖 help (Commande) pour une aide ciblée"
        message.reply(helpMenu)

    } else {
        if(args[1] in commandsList){
            let commandData = commandsList[args[1]].help
            let menu = `Commande ` + commandData.name + "\n\n📖 Description : " + commandData.desc + "\n⚙️ Usage : " + commandData.usage + "\n🔎 Exemple : " + commandData.example + "\n\n\n() => Paramètre optionel\n[] => Paramètre obligatoire"
            
            message.reply(menu)

        } else return func.sendError("Aucune commande trouvée.", message)
    }
}

exports.help = {
    "name": "help",
    "desc": "Affiche la liste des commandes ou une aide ciblée sur une commande.",
    "usage": "help (Commande)",
    "example": "help\nhelp say"
}