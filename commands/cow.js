module.exports.command = async (ig, message) => {
    const func = require("../utils/functions")
    const Canvas = require("canvas")
    const { createCanvas, loadImage } = require('canvas')
    const fs = require("fs")

    const args = message.content.replace("cow", "").trim().split(" ")

    let prompt = "Celui qui m'a demandé est stupide"

    if(args.length != 0) prompt = args.join(' ')

    const canvas = createCanvas(800, 475)
    const ctx = canvas.getContext('2d')

    const background = await Canvas.loadImage(`./res/cowTemplate.jpg`);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    let size = 30
    let length = prompt.length
    
    if(length >= 20){
      length -= 20
      while(length - 15 > 0 && size > 0){
        size-=2
        console.log(size)
        length-=15
      }
    }

    ctx.font = size + 'px Arial'
    ctx.fillText(prompt, 100, 350)

    fs.writeFileSync("res/cowSay.jpeg", canvas.toBuffer('image/jpeg'))

    await ig.entity.directThread(message.thread).broadcastPhoto({
      file: await fs.readFileSync("./res/cowSay.jpeg")
    })

}

exports.help = {
    "name": "cow",
    "desc": "Permet de faire parler une vache.",
    "usage": "cow [Phrase]",
    "example": "cow Salut ! Ca mange de l'herbe là"
}