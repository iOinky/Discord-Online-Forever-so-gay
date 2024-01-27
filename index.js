const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config(); // Load environment variables from .env file

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ],
});

const targetChannelId = '1200747293033382051'; // Replace with the actual channel ID
const predictionHistoryLength = 5; // Adjust the number of past numbers to use for prediction

let numbersLog = [];

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (message.channel.id === targetChannelId) {
        const content = message.content.trim();
        const numbers = content.match(/\d{1,2}/g);

        if (numbers) {
            numbersLog = numbers.map(Number); // Convert string numbers to integers
            console.log('Numbers logged:', numbersLog);

            try {
                const predictedNumber = predictNextNumber();
                message.channel.send(`I predict the next number will be: ${predictedNumber}`);
            } catch (error) {
                console.error('Error predicting number:', error);
            }
        }
    }
});

function predictNextNumber() {
    if (numbersLog.length >= predictionHistoryLength) {
        const lastNumbers = numbersLog.slice(-predictionHistoryLength);
        const average = lastNumbers.reduce((sum, num) => sum + num, 0) / predictionHistoryLength;
        return Math.round(average);
    } else {
        throw new Error('Not enough numbers in the log to make a prediction.');
    }
}

client.login(process.env.BOT_TOKEN); // Use the bot token from the .env file

// Keep-alive functionality
const keepAlive = require('./keep_alive'); // Assuming you have a keep_alive.js file
keepAlive(client);
