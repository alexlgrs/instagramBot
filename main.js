var fs = require("fs");
const axios = require("axios")
const getClient = require("./utils/getClient");
const InstaMessage = require("./utils/Message");
const {getCommands, checkInvits, sendSucces, sendError} = require("./utils/functions");

const running = require("./databases/running.json");

(async () => {
  let ig = await getClient();

  console.log("✅ | Prêt à l'emploi");

  setInterval(function(){checkInvits(ig)}, 120000)

  ig.realtime.on("message", async (data) => {
    let message = new InstaMessage(data.message, ig);
    var  commandsList = getCommands()

    if (data.message.media != undefined) {
      let imageURL = data.message.media.image_versions2.candidates[0].url;

      const response = await axios.get(imageURL, {responseType: "arraybuffer",});

      if (running["waitingPdp"]["status"] == true && message.author.id == running["waitingPdp"]["user"]) {
        ig.account.changeProfilePicture(Buffer.from(response.data, "utf-8")).then(res => {
          sendSucces("Photo de profil changée !", message);
          running["waitingPdp"]["status"] = false;
        })
      }

      if (running["waitingPost"]["status"] == true && author.id == running["waitingPost"]["user"]) {
        if (running["waitingPost"]["caption"] == "any") return sendError("Vous devez envoyer la description en premier");
        
        await ig.publish.photo({file: Buffer.from(response.data, "utf-8"), caption: running["waitingPost"]["caption"]}).then(res => {
            sendSucces("Photo postée !", message);
            running["waitingPost"]["status"] = false;
        })
      }
    }
    
    if(message.content != undefined && message.content.split(" ")[0] in commandsList) commandsList[message.content.split(" ")[0]].command(ig, message)
    
  });


})();