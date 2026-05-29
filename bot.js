const mineflayer = require('mineflayer');

const serverHost = 'vortexcraftuz.mcsh.io';
const serverPort = 25565;

const account = { username: 'million_01', password: 'million' };

function startBot() {
    console.log(`[ULANISH] ${account.username} ulanmoqda...`);

    const bot = mineflayer.createBot({
        host: serverHost,
        port: serverPort,
        username: account.username,
        version: '1.21',
        hideErrors: true,
        connectTimeout: 60000,
        keepAlive: true
    });

    bot.on('spawn', () => {
        console.log(`[OK] ${account.username} serverga kirdi.`);
        
        // 5 soniyadan keyin "/server anarxiya" buyrug'ini yuborish
        setTimeout(() => {
            bot.chat('/server anarxiya');
            console.log(`[BUYRUQ] /server anarxiya yuborildi.`);
        }, 5000); 
    });

    bot.on('messagestr', (msg) => {
        const cleanMsg = msg.trim().toLowerCase();
        
        if (cleanMsg.includes('/login') || cleanMsg.includes('login') || cleanMsg.includes('tizimga kirish')) {
            bot.chat(`/login ${account.password}`);
            console.log(`[LOGIN] ${account.username} uchun parol yuborildi.`);
        }
    });

    // Har 1 soatda qayta "/server anarxiya" deb yozish
    setInterval(() => {
        if (bot.spawned) {
            bot.chat('/server anarxiya');
            console.log(`[VAQT] Har soatlik qayta buyruq yuborildi.`);
        }
    }, 3600000); // 3600000 ms = 1 soat

    bot.on('end', (reason) => {
        console.log(`[!] ${account.username} uzildi. 1 daqiqadan keyin qayta ulanadi...`);
        setTimeout(() => {
            startBot();
        }, 60000);
    });

    bot.on('error', (err) => console.log(`[ERR] ${account.username}: ${err.message}`));
}

startBot();
