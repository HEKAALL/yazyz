const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async (message) => {
    if (message.body === '!ping') {
        message.reply('pong');
    } else if (message.type === 'image' && message.body.startsWith('.sticker')) {
        const media = await message.downloadMedia();
        client.sendMessage(message.from, media, { sendMediaAsSticker: true });
    }
});

client.initialize();
