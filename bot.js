const mineflayer = require('mineflayer');

const serverHost = 'vortexcraftuz.mcsh.io';
const serverPort = 25565;

const accounts = [
  { username: 'ZahridinSMP', password: 'shukrona' },
  { username: 'ItzZaridin____', password: 'shukrona' },
];

function startBot(account) {
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

    // Bot serverga muvaffaqiyatli kirgandagi log
    bot.on('spawn', () => {
        console.log(`[OK] ${account.username} serverga kirdi (Spawn bo'ldi).`);
    });

    // FAQAT LOGIN QILISH QISMI
    bot.on('messagestr', (msg) => {
        const cleanMsg = msg.trim().toLowerCase();
        
        // Chatda login so'ralganini aniqlash
        if (cleanMsg.includes('/login') || cleanMsg.includes('login') || cleanMsg.includes('tizimga kirish')) {
            bot.chat(`/login ${account.password}`);
            console.log(`[LOGIN] ${account.username} uchun parol yuborildi.`);
        }
    });

    // Agar bot serverdan uzilib qolsa, 30 soniyadan keyin qayta kiradi
    bot.on('end', (reason) => {
        console.log(`[!] ${account.username} uzildi. 30 soniyadan keyin qayta ulanadi... Sabab: ${reason}`);
        setTimeout(() => startBot(account), 30000);
    });

    // Xatoliklar yuz bersa logda ko'rsatish
    bot.on('error', (err) => console.log(`[ERR] ${account.username}: ${err.message}`));
}

// Botlarni ketma-ket (45 soniya farq bilan) ishga tushirish
accounts.forEach((acc, index) => {
    setTimeout(() => {
        startBot(acc);
    }, index * 45000); 
});
