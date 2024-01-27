const Eris = require("eris");
const keep_alive = require('./keep_alive.js');

// Replace TOKEN with your bot account's token
const bot = new Eris(process.env.token);

const targetChannelId = 1200747293033382051;
let lastNumber = null;

bot.on("error", (err) => {
 console.error(err); // or your preferred logger
});

bot.connect(); // Get the bot to connect to Discord

bot.on("messageCreate", (message) => {
 if (message.channel.id === targetChannelId) {
   const content = message.content.trim();

   // Check if the message contains a number between 0 and 100
   const number = parseInt(content);
   if (!isNaN(number) && number >= 0 && number <= 100) {
     lastNumber = number;

     // Predict the next number (you can replace this with your prediction logic)
     const predictedNumber = Math.floor(Math.random() * 101); // Simple random prediction for example

     // Send the predicted number to the channel
     message.channel.send(`The next number could be: ${predictedNumber}`);
   }
 }
});

// Keep the bot alive (if applicable)
keep_alive();
