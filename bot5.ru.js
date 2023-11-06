const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');

const TELEGRAM_TOKEN = '6896832530:AAEQDsGxu2MnywJzMMc6ZLnRzukra-2ClTQ'; // Вставьте ваш токен здесь
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

let purchases = {};
fs.readFile('bot5.json', 'utf8', (err, fileContents) => {
    if (err) throw err; 

    purchases = JSON.parse(fileContents)
    console.log('Данные прочитаны.');
});

function mainMenuKeyboard(chatId) {
    const keyboard = [
        [
            { text: 'Записать покупку', callback_data: 'purchase' },
            { text: 'Посмотреть все', callback_data: 'view_all' }
        ],
        [
            { text: 'Очистить историю', callback_data: 'clear' }
        ]
    ];
    
    bot.sendMessage(chatId, 'Выберите действие:', {
        reply_markup: {
            inline_keyboard: keyboard
        }
    });
}

bot.on('callback_query', async (callbackQuery) => {
    const message = callbackQuery.message;
    const chatId = message.chat.id;
    const data = callbackQuery.data;

    if (data === 'purchase') {
        await bot.sendMessage(chatId, "Пожалуйста, отправьте мне детали покупки в этом формате: `Название продукта;Цена;Дата (необязательно)`", {parse_mode: "Markdown"});
    } else if (data === 'view_all') {
        viewAllPurchases(chatId);
    } else if (data === 'view_last_month') {
        viewLastMonthPurchases(chatId);
    } else if (data === 'clear') {
        clearPurchases(chatId);
    }

    // Удаляем начальную инлайн-клавиатуру после выбора опции
    bot.deleteMessage(chatId, message.message_id);
});

bot.onText(/.*/, async (msg, match) => {
    const chatId = msg.chat.id;
    const input = match[0];

    // Проверяем соответствие ввода ожидаемому формату
    const purchaseRegex = /^(.*);(\d+\.?\d*);?(.*)$/;
    const matchResult = input.match(purchaseRegex);

    if (!matchResult) {
        return;
    }

    const [_, productName, price, date] = matchResult;

    const purchase = {
        product: productName,
        price: parseFloat(price),
        date: date || new Date().toLocaleDateString()
    };
    if (!purchases[chatId]) {
        purchases[chatId] = [];
    }

    purchases[chatId].push(purchase);
    fs.writeFile('bot5.ru.json', JSON.stringify(purchases), (err) => {
        if (err) throw err;
        console.log('Данные сохранены.');
    });

    await bot.sendMessage(chatId, `Добавлено ${productName} с ценой ${price} на ${purchase.date}`);
    mainMenuKeyboard(chatId);
});

function viewAllPurchases(chatId) {
    let message = 'Все покупки:\n';
    if(purchases[chatId] && purchases[chatId].length){
        purchases[chatId].forEach(p => {
            message += `${p.product} - ${p.price} на ${p.date}\n`;
        });
    } else {
        message = "Вы еще не записали никаких покупок.";
    }
    bot.sendMessage(chatId, message);
    mainMenuKeyboard(chatId);
}

function clearPurchases(chatId) {
    purchases[chatId] = [];
    bot.sendMessage(chatId, "Все записи о покупках были очищены.");
    mainMenuKeyboard(chatId);
}

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    mainMenuKeyboard(chatId);
});

console.log('Бот запущен...');
Бот запущен...
Данные прочитаны.
