const Eris = require('eris');

const bot = new Eris(process.env.BOT_TOKEN, {
    ws: { intents: ['GUILDS', 'GUILD_MESSAGES'] } // Set intents directly
});

const targetChannelId = '1200747293033382051'; // Replace with the actual channel ID
const predictionHistoryLength = 5; // Adjust the number of past numbers to use for prediction

let numbersLog = [];

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.username}!`);
});

bot.on('messageCreate', async (message) => {
    if (message.channel.id === targetChannelId) {
        const content = message.content.trim();
        const numbers = content.match(/\d{1,2}/g);

        if (numbers) {
            numbersLog = numbers.map(Number); // Convert string numbers to integers
            console.log('Numbers logged:', numbersLog);

            try {
                const predictedNumber = predictNextNumber();
                message.channel.createMessage(`I predict the next number will be: ${predictedNumber}`);
            } catch (error) {
                console.error('Error predicting number:', error);
            }
        }
    }
});

function predictNextNumber() {
    // Implement your prediction logic here, using numbersLog

    // Example: Simple prediction based on the average of the last few numbers
    if (numbersLog.length >= predictionHistoryLength) {
        const lastNumbers = numbersLog.slice(-predictionHistoryLength);
        const average = lastNumbers.reduce((sum, num) => sum + num, 0) / predictionHistoryLength;
        return Math.round(average);
    } else {
        throw new Error('Not enough numbers in the log to make a prediction.');
    }
}

bot.connect();

// Keep-alive functionality (if still needed)
const keepAlive = require('./keep_alive'); // Assuming you have a keep_alive.js file
keepAlive(bot);
