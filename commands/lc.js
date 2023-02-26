module.exports.command = async (ig, message) => {
    const func = require("../utils/functions")

    const args = message.content.replace("lc", "").trim().split(" ")

    let author = await message.author

    switch (args.length) {
      case 1: // Entre l'auteur et le mec mentionné
        let authorInfo = await ig.user.info(author.id)
        let username = await authorInfo.full_name
        
        if(args[0].length == 0) args[0] = "Moi"

        if(args[0].includes("@")){
          let info = await ig.user.usernameinfo(args[0].replace("@", ""))
          if(await info == undefined) return sendError("Utilisateur inconnu", message)
          
          await message.reply(username + " + " + (info.full_name.length == 0 ? info.username : info.full_name) + " = " + Math.ceil(func.getRdm(0, 100)) + "% 💓")
        } else {
          await message.reply(username + " + " +  args[0] + " = " + Math.ceil(func.getRdm(0, 100)) + "% 💓")
        }

        break;
      case 2:
        if(args[0].includes("@")){
          let user1 = await ig.user.usernameinfo(args[0].replace("@", ""))
          if(await user1 == undefined) return sendError("Utilisateur inconnu", message)
          if(args[1].includes("@")){ // lovelcalc @qqun @qqdautre
            let user2 = await ig.user.usernameinfo(args[1].replace("@", ""))
            if(await user2 == undefined) return sendError("Utilisateur inconnu", message)
            await message.reply((user1.full_name.length == 0 ? user1.username : user1.full_name) + " + " + (user2.full_name.length == 0 ? user2.username : user2.full_name) + " = " + Math.ceil(func.getRdm(0, 100)) + "% 💓")
          } else { // lovelcalc @qqun qqch
            await message.reply((user1.full_name.length == 0 ? user1.username : user1.full_name) + " + " + args[1] + " = " + Math.ceil(func.getRdm(0, 100)) + "% 💓")
          }
        } else {
          if(args[1].includes("@")){ // lovelcalc qqch @qqun
            let user1 = await ig.user.usernameinfo(args[1].replace("@", ""))
            if(await user1 == undefined) return sendError("Utilisateur inconnu", message)
            await message.reply((user1.full_name.length == 0 ? user1.username : user1.full_name) + " + " + args[0] + " = " + Math.ceil(func.getRdm(0, 100)) + "% 💓")
          } else { // lovelcalc qqch qqchdautre
            await message.reply(args[0] + " + " + args[1] + " = " + Math.ceil(func.getRdm(0, 100)) + "% 💓")
          }
        }
    }
}

exports.help = {
    "name": "lc",
    "desc": "Permet de connaître le pourcentage d'amour !",
    "usage": "lc [@utilisateur / objet] (@utilisateur / objet)",
    "example": "\nlc @marina.jdx\nlc bouffe\nlc @marina.jdx @oliviergiroud\nlc foot psg\nlc @marina.jdx raclette\nlc foot @marina.jdx",
}