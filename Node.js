const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const accountSid = 'YOUR_ACCOUNT_SID'; // weka SID kutoka Twilio
const authToken = 'YOUR_AUTH_TOKEN';   // weka Token kutoka Twilio
const client = new twilio(accountSid, authToken);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Function ya kujibu ujumbe
function getBotReply(message) {
    const msg = message.toLowerCase().trim();

    if (msg === 'hi' || msg === 'hello') {
        return "Hello! Karibu kwenye WhatsApp Bot.";
    } else if (msg === 'habari') {
        return "Nzuri! Na wewe je?";
    } else if (msg.includes('jina')) {
        return "Mimi ni WhatsApp bot wako wa msaada.";
    } else {
        return "Samahani, sijakuelewa. Tafadhali jaribu tena.";
    }
}

// Endpoint ya kupokea ujumbe
app.post('/whatsapp', (req, res) => {
    const userMessage = req.body.Body;
    const from = req.body.From;

    const botReply = getBotReply(userMessage);

    client.messages
        .create({
            body: botReply,
            from: 'whatsapp:+14155238886', // namba ya Twilio
            to: from
        })
        .then((message) => console.log(`Sent message ${message.sid}`))
        .catch((err) => console.error(err));

    res.send('<Response></Response>');
});

// Kuwasha server
app.listen(3000, () => {
    console.log('Bot is running at http://localhost:3000');
});
