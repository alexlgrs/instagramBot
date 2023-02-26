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

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
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
    runCompletion
}