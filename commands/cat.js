module.exports.command = async (ig, message) => {
    const func = require("../utils/functions")
    const randomCat = require("random-cat-img")
    const axios = require("axios")


    message.reply("😺 Chat en route 🐈")
    randomCat().then(async res => {
        const response = await axios.get(res.data.message, {
            responseType: "arraybuffer",
        });

        ig.entity.directThread(message.thread).broadcastPhoto({
            file: Buffer.from(response.data, "utf-8")
        })
    });
}

exports.help = {
    "name": "cat",
    "desc": "Permet de récuperer une photo de chat.",
    "usage": "cat",
    "example": "cat"
}