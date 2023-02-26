const fs = require("fs")
const {DirectPendingInboxFeed} = require("instagram-private-api")
const sendSucces = (text, message) => {
    message.reply("✅ | " + text)
}

const sendError = (text, message) => {
    message.reply("❌ | " + text)
}

const sendRunning = (text, message) => {
    message.reply("⚙️ | " + text)
}

function getRdm(min, max) {
    return Math.random() * (max - min) + min;
}

async function checkInvits(ig){
  
  let invitations = new DirectPendingInboxFeed(ig)
  let items = await invitations.items()

  if(items.length != 0){
    await ig.entity.directThread(items[0].thread_id).broadcastText("✅Bien ajouté \n📨Je répondrais désormais à vos messages\n📖 Faites help pour plus d'informations.")
  }
}
function getCommands(){
  var  commandsList = {}

  fs.readdirSync("./commands").forEach(file => {
      let command = require("../commands/" + file)

      commandsList[command.help.name] = command
  });

  return commandsList
}

async function generateText(prompt) {
    const result = await openai.complete({
      engine: 'davinci',
      prompt: prompt,
      maxTokens: 150,
      n: 1,
      stop: ['\n']
    });
    return result.data.choices[0].text.trim();
  }
  
function log(text, emoji, time = Date.now()){
    console.log(emoji + " | " + text)
}

const {apiKey} = require("./params")
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);

async function runCompletion (question) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: question,
    max_tokens: 600
  });
  return completion.data.choices[0].text;
  }

module.exports = {
    sendSucces,
    sendError, 
    sendRunning, 
    generateText,
    log,getRdm,
    runCompletion,
    getCommands,
    checkInvits
}