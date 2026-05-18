const mineflayer = require('mineflayer');

const serverHost = 'vortexcraftuz.mcsh.io';
const serverPort = 25565;

const accounts = [
  { username: 'ZahridinSMP', password: 'shukrona' },
  { username: 'ItzZaridin____', password: 'shukrona' },
];

function startBot(account) {
    // To'g'rilandi: Baqtiklar (`) qo'yildi
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

    // Anarxiya2 ga o'tish funksiyasi
    const goToAnarchy = () => {
        if (bot.entity) {
            bot.chat('/server smp');
            console.log(`[MAJBURIY] ${account.username}: /server smp yuborildi.`);
        }
    };

    const goToAFKWarp = () => {
        if (bot.entity) {
            bot.chat('/warp afk');
            console.log(`[WARP] ${account.username}: /warp afk yuborildi.`);
        }
    };

    // 1. HUBDAN CHIQA OLMAY QOLSA - XABARLARNI ANALIZ QILISH
    bot.on('messagestr', (msg) => {
        const cleanMsg = msg.trim().toLowerCase();
        
        // To'g'rilandi: || operatorlari joyiga qo'yildi
        if (cleanMsg.includes('/login') || cleanMsg.includes('login') || cleanMsg.includes('tizimga kirish')) {
            bot.chat(`/login ${account.password}`);
            return;
        }

        // Hubda ekanini anglatuvchi xabarlar kelganda
        if (cleanMsg.includes('hub') || cleanMsg.includes('lobby') || cleanMsg.includes('articraft') || cleanMsg.includes('xush kelibsiz')) {
            setTimeout(goToAnarchy, 10000); // 10 soniya kutib o'tadi
        }
    });

    // 2. MAJBURIY TAYMERLAR
    bot.on('spawn', () => {
        console.log(`[OK] ${account.username} spawn bo'ldi.`);
        
        // Bot har safar kutilmaganda spawn bo'lsa, 15 soniyadan keyin o'tadi
        setTimeout(goToAnarchy, 15000);

        // HAR 5 DAQIQADA MAJBURIY /server smp
        setInterval(() => {
            goToAnarchy();
        }, 300000);

        // Har 3 soatda /warp afk
        setInterval(() => {
            goToAFKWarp();
        }, 10800000); // To'g'rilandi: 3 soat millisekundda 10,800,000 bo'ladi (bitta nol kam edi)
    });

    bot.on('end', (reason) => {
        console.log(`[!] ${account.username} uzildi. 30 soniyadan keyin qayta kiradi... Sabab: ${reason}`);
        setTimeout(() => startBot(account), 30000);
    });

    bot.on('error', (err) => console.log(`[ERR] ${account.username}: ${err.message}`));
}

// Botlarni navbat bilan kiritish
accounts.forEach((acc, index) => {
    setTimeout(() => {
        startBot(acc);
    }, index * 45000); 
});
