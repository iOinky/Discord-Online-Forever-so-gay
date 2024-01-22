const Eris = require("eris");
const keep_alive = require('./keep_alive.js')

const bot = new Eris(process.env.token);

bot.on("error", (err) => {
  console.error(err); 
});

const channelId = "1078889213015113788";

function sendSoGay() {
  const channel = bot.getChannel(channelId);
  if (channel) {
    channel.createMessage("so gay");
  }
}

// Set up interval to call the function every 30 seconds
setInterval(sendSoGay, 15000);

bot.connect();
