module.exports.command = async (ig, message) => {
    const func = require("../utils/functions")
    const Canvas = require("canvas")
    const { createCanvas, loadImage } = require('canvas')
    const axios = require("axios")

    const args = content.replace(command, "").trim().split(" ")

    let user = await ig.user.getIdByUsername(args[0])
    
    let userData = await ig.user.info(user)

    const canvas = createCanvas(800, 475)
    const ctx = canvas.getContext('2d')

    const background = await Canvas.loadImage(`./res/profileTemplate.png`);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const response = await axios.get(userData['hd_profile_pic_url_info']["url"], {
      responseType: "arraybuffer",
    });

    let pp = Canvas.loadImage(Buffer.from(response.data, "utf-8"))
    ctx.drawImage(pp, 50, 50)
    let size = 30
    ctx.font = size + 'px Arial'
    ctx.fillText(prompt, 100, 350)

    fs.writeFileSync("res/profile.jpeg", canvas.toBuffer('image/jpeg'))

    await ig.entity.directThread(message.thread).broadcastPhoto({
      file: await fs.readFileSync("./res/profile.jpeg")
    })
}

exports.help = {
    "name": "ui",
    "desc": "Permet de récupérer les infos sur un utilisateur.",
    "usage": "ui [@Utilisateur]",
    "example": "ui @lgrs.alex"
}