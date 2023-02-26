var fs = require("fs");
const gTTS = require("gtts");
const { Configuration, OpenAIApi } = require("openai");
const ConvertCommand = require("mp3-to-video");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
const gtts = require("google-tts-api");
const axios = require("axios");
const { promisify } = require("util");
const { IgApiClient, DirectPendingInboxFeed } = require("instagram-private-api");
const randomCat = require('random-cat-img');
const Canvas = require("canvas")
const { createCanvas, loadImage } = require('canvas')
const readFileAsync = promisify(fs.readFile);

const getClient = require("./utils/getClient");
const InstaMessage = require("./utils/Message");
const {sendSucces, sendError, sendRunning, generateText, log, runCompletion, getRdm} = require("./utils/functions");
const { username, password, apiKey, languages, commands, ownerID} = require("./utils/params");
const running = require("./databases/running.json");

let main = (async () => {
  
  let ig = await getClient();
  let igStart = Date.now();

  console.log("✅ | Prêt à l'emploi");

  let invitations = new DirectPendingInboxFeed(ig)
  
  checkInvits()
  async function checkInvits(){
    let items = await invitations.items()

    if(items.length != 0){
      await ig.entity.directThread(items[0].thread_id).broadcastText("✅Bien ajouté \n📨Je répondrais désormais à vos messages\n📖 Faites help pour plus d'informations.")
    }
  }

  setInterval(checkInvits, 120000)

  ig.realtime.on("message", async (data) => {
    let now = Date.now();
  

    let content = data.message.text;

    let igd = new IgApiClient();

    let message = new InstaMessage(data.message, ig);
    let author = await message.author;

    if(author.id == "58167820991") return
    if (author.id == username) return;

    if (data.message.media != undefined) {
      let imageURL = data.message.media.image_versions2.candidates[0].url;

      const response = await axios.get(imageURL, {
        responseType: "arraybuffer",
      });

      const buffer = Buffer.from(response.data, "utf-8");


      if (running["waitingPdp"]["status"] == true && author.id == running["waitingPdp"]["user"]) {
        ig.account.changeProfilePicture(buffer).then(res => {
          sendSucces("Photo de profil changée !", message);
          running["waitingPdp"]["status"] = false;
          log("Photo de profil modifée" , "🖼️")

        })
      }
      if (running["waitingPost"]["status"] == true && author.id == running["waitingPost"]["user"]) {
        if (running["waitingPost"]["caption"] == "any") return sendError("Vous devez envoyer la description en premier");
        
          await ig.publish.photo({
          file: buffer,
          caption: running["waitingPost"]["caption"],
        }).then(res => {
          sendSucces("Photo postée !", message);
          running["waitingPost"]["status"] = false;
          log("Post publié", "📷")
        })
      }
    }

    
    if (content == undefined) return;

    // Detection des commandes personnalisées
    for(commandIndex in running["commands"]){
      if(content.includes(commandIndex)){
        message.reply(running["commands"][commandIndex])
      } 
    }

    let command = content.split(" ")[0].trim()

    if (running["waitingPost"]["caption"] == "any" && running["waitingPost"]["user"] == author.id) {
      running["waitingPost"]["caption"] = content;
      sendRunning("Description enregistrée, en attente de l'image", message);
      log("Description du post enregistrée", "✒️")
      command = "any"
    }

    if(command == "res"){
      let args = content.replace(command, "").split("|")

      if(args.length < 2) return sendError("Commande incomplète", message)

      running["commands"][args[0].trim()] = args[1].trim()
      sendSucces("Réponse automatique enregistrée !", message)

      fs.readFile('./databases/running.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(data); //now it an object
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile('./databases/running.json', json, 'utf8', ()=>console.log("Edité")); // write it back 
    }});
    }


    if (command == "ping") {
      message.reply("Pong ! 🏓\nLatence : " + (Date.now() - now) + "ms");
      log("Temps de réponse envoyé", "🏓")
    }

    if (command == "setBio") {
      let args = content.split(command)
      if(args.length == 1) return sendError("Vous devez préciser la biographie.", message)

      let bio = args[1]
      ig.account.setBiography(bio);
      sendSucces("Biographie changée !", message);
      log("Biographie changée" , "📃")
    }

    if (command == "clearPdp") {
      ig.account.removeProfilePicture();
      sendSucces("Photo de profil retirée", message);
      log("Photo de profil supprimée" , "⛔")
    }

    if (command == "setPdp") {
      running["waitingPdp"] = {
        status: true,
        user: author.id,
      };

      sendRunning("En attente de l'image", message);
      log("Début de la procédure de changement de photo de profil" , "🖼️")
    }

    if (command == "newPost") {
      running["waitingPost"] = {
        caption: "any",
        status: true,
        user: author.id,
      };
      sendRunning("En attente de la description de l'image", message);
      log("Début de la procédure de post" , "📷")
    }

    if(command == "lc"){
      let args = content.split(command)[1].trim().split(" ")

      switch (args.length) {
        case 1: // Entre l'auteur et le mec mentionné
          let authorInfo = await ig.user.info(author.id)
          let username = await authorInfo.full_name
          
          if(args[0].length == 0) args[0] = "Moi"

          if(args[0].includes("@")){
            let info = await ig.user.usernameinfo(args[0].replace("@", ""))
            if(await info == undefined) return sendError("Utilisateur inconnu", message)
            
            await message.reply(username + " + " + (info.full_name.length == 0 ? info.username : info.full_name) + " = " + Math.ceil(getRdm(0, 100)) + "% 💓")
          } else {
            await message.reply(username + " + " +  args[0] + " = " + Math.ceil(getRdm(0, 100)) + "% 💓")
          }

          break;
        case 2:
          if(args[0].includes("@")){
            let user1 = await ig.user.usernameinfo(args[0].replace("@", ""))
            if(await user1 == undefined) return sendError("Utilisateur inconnu", message)
            if(args[1].includes("@")){ // lovelcalc @qqun @qqdautre
              let user2 = await ig.user.usernameinfo(args[1].replace("@", ""))
              if(await user2 == undefined) return sendError("Utilisateur inconnu", message)
              await message.reply((user1.full_name.length == 0 ? user1.username : user1.full_name) + " + " + (user2.full_name.length == 0 ? user2.username : user2.full_name) + " = " + Math.ceil(getRdm(0, 100)) + "% 💓")
            } else { // lovelcalc @qqun qqch
              await message.reply((user1.full_name.length == 0 ? user1.username : user1.full_name) + " + " + args[1] + " = " + Math.ceil(getRdm(0, 100)) + "% 💓")
            }
          } else {
            if(args[1].includes("@")){ // lovelcalc qqch @qqun
              let user1 = await ig.user.usernameinfo(args[1].replace("@", ""))
              if(await user1 == undefined) return sendError("Utilisateur inconnu", message)
              await message.reply((user1.full_name.length == 0 ? user1.username : user1.full_name) + " + " + args[0] + " = " + Math.ceil(getRdm(0, 100)) + "% 💓")
            } else { // lovelcalc qqch qqchdautre
              await message.reply(args[0] + " + " + args[1] + " = " + Math.ceil(getRdm(0, 100)) + "% 💓")
            }
          }
      }
    }

    if (command == "ask") {
      let args = content.split("ask")
      if(args[1].length == 0) return sendError("Vous devez préciser la question à poser !", message)
      let question = args[1].trim();

      let response = await runCompletion(question)
      await message.reply(response)

    }

    if(command == "llist"){
        message.reply("LANGUES DISPONIBLES\n\n" + languages + "\n\n[langue]say [message]" )
        log("Liste des langues envoyée", "🌍")
    }

    if(command == "cat"){
      message.reply("😺 Chat en route 🐈")
      randomCat().then(async res => {
        const response = await axios.get(res.data.message, {
          responseType: "arraybuffer",
        });
  
      const buffer = Buffer.from(response.data, "utf-8");
        ig.entity.directThread(message.thread).broadcastPhoto({
          file: buffer,allowFullAspectRatio:false
        }).then(res => log("Photo de chat envoyée ", "😺"))
      });
      
    }

    if(command == "help"){
        if(content == "help"){
            let liste = ""
            for(commandItem in commands){
                liste += "\n• " + commandItem
            }
            let helpMenu = "Liste des commandes : \n" + liste + "\n\n📖 help (Commande) pour une aide ciblée"
            message.reply(helpMenu)
            log("Menu d'aide envoyé ", "📚")   
        } else {
            let arg = content.split("help")[1].trim()

            let command = false
            
            for(commandIndex in commands){
              if(commands[commandIndex].name == arg) command = commands[commandIndex]
            }

            if(command != false){
              let menu = `Commande ` + arg + "\n\n📖 Description : " + commands[arg]["desc"] + "\n⚙️ Usage : " + commands[arg]["usage"] + "\n🔎 Exemple : " + commands[arg]["example"] + "\n\n\n() => Paramètre optionel\n[] => Paramètre obligatoire"
              message.reply(menu)
              log("Menu d'aide avancé envoyé ", "📖")  
            } else return sendError("Aucune commande trouvée.", message)
        }
       
    }

    if(command == "cow"){
      let args = content.split(command)
      console.log(args)
      let prompt = "Celui qui m'a demandé est stupide"

      if(args[1].length > 1) prompt = args[1].trim()

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

      log("Vache qui dit " + prompt + " envoyée", "🐮")
    }

    if(command == "voy"){
      let args = content.split(command)
      if(args[1].length == 0) return sendError("Veuillez poser une question !", message)
      
      let answers = ["Oui.", "Definitivement oui.", "Bien-sûr que oui !!!!", "Grave ^^", "HAHHAHAHA bah non", "Non.", "Evidemment que non t'es coco dingo", "Bah non man", "Peut-être..", "Je dirais pas ça comme ça mais.. oui", "Je dirais que oui", "Joker pomme de pin"]

      let answer = answers[Math.ceil(getRdm(0, answers.length - 1))]

      message.reply("🔮 Réponse de la voyante : 🪄\n" + answer)
    }

    if(command == "ui"){ // Pas utilisable
      let args = content.replace(command, "").trim().split(" ")

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

      await console.log(userData['hd_profile_pic_url_info']["url"])
    }

    if (command.includes("say")) {
      let args = content.split(" ")
      ffmpeg.setFfmpegPath(ffmpegPath);

  

      var prompt = "Celui qui m'a demandé est stupide !"
      
      if(args.length > 1) prompt = content.replace(command, "")

      if(prompt.length > 204) return sendError("Message vocal trop long, désolé.", message)
      var languagesList = ["af","sq","ar","hy","ca","zh","zh-cn","zh-tw","zh-yue","hr","cs","da","nl","en","en-au","en-uk","en-us","eo ","fi ","fr","de","el","ht ","hi ","hu","is","id","it","ja","ko","la","lv","mk","no","pl","pt","pt-br","ro","ru","sr","sk","es","es-es","es-us","sw","sv","ta","th","tr","vi","cy",];
      
      let language = "fr";

      for(languageIndex in languagesList){
        if(args[0].includes(languagesList[languageIndex] + "_")) language = languagesList[languageIndex]
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

              log("Message vocal envoyé ", "🔊")            
          }
        );
      });
    }
  });


})();