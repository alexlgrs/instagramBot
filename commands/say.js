module.exports.command = async (ig, message) => {
    const func = require("../utils/functions")
    const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
    const ffmpeg = require("fluent-ffmpeg");
    const gTTS = require("gtts");
    const fs = require("fs")
    const ConvertCommand = require("mp3-to-video");

    const args = message.content.trim().split(" ")

    ffmpeg.setFfmpegPath(ffmpegPath);

    if(args.length <= 1) return func.sendError("Veuillez préciser le message à envoyer !", message)
    var prompt = message.content.replace(args[0], "").trim()

    if(prompt.length > 204) return sendError("Message vocal trop long, désolé.", message)

    var languagesList = ["af","sq","ar","hy","ca","zh","zh-cn","zh-tw","zh-yue","hr","cs","da","nl","en","en-au","en-uk","en-us","eo ","fi ","fr","de","el","ht ","hi ","hu","is","id","it","ja","ko","la","lv","mk","no","pl","pt","pt-br","ro","ru","sr","sk","es","es-es","es-us","sw","sv","ta","th","tr","vi","cy",];
    let language = "fr";

    for(languageIndex in languagesList){
      if(args[1] == languagesList[languageIndex]) {
        language = languagesList[languageIndex]
        prompt = prompt.replace(args[1], "")
      }
    }

    const gtts = new gTTS(prompt, language);
    gtts.save("./res/tts/ttsresult.mp3", async (err, result) => {
      if (err) throw new Error(err);
      new ConvertCommand("./res/tts/ttsresult.mp3", "mp4", "./res/image.png").init(
        async (err, response) => {
          if (err) throw new Error(err);
          ig.entity
            .directThread(message.thread)
            .broadcastVoice({
              file: fs.readFileSync("./res/tts/ttsresult.mp4")
            });       
        }
      );
    });
}

exports.help = {
    "name": "say",
    "desc": "Permet de faire parler le bot avec différentes langues.",
    "usage": "(Langue_)say [Phrase]",
    "example": "say Salut salut vous\nen_say Hellooo !"
}