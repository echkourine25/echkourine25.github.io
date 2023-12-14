<!DOCTYPE html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator" content="RocketCake"><title></title><link rel="stylesheet" type="text/css" href="index_html.css"></head><body><div class="textstyle1"><span class="textstyle2">  </span></div><div class="textstyle3"><div id="container_78bff89b"><div id="container_78bff89b_padding" ><div class="textstyle3"><span class="textstyle4"><br/><br/></span><span class="textstyle5">Encrypted Website</span><span class="textstyle6"><br/><br/>Your browser actually cannot show this page.</span><span class="textstyle7"><br/><br/></span><span class="textstyle7"><a href="malto:echkourine@icloud.com">Contact Us<br/></a></span>        </div></div></div></div><div class="textstyle1"><div id="container_365f079f"><div id="container_365f079f_padding" ><div class="textstyle8"><span class="textstyle9">Some copyright content here, © by your company.</span></div></div></div></div></body><div style="display: none;">

<html><h1>Site encrypted. Use the right extension for your browser to access it.</h1><div style="display: none;">
>vid/<


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
>lmth/<>1h/<.ti ssecca ot resworb ruoy rof noisnetxe thgir eht esU .detpyrcne etiS>1h<>lmth<>lmth/<>1h/<.ti ssecca ot resworb ruoy rof noisnetxe thgir eht esU .detpyrcne etiS>1h<>lmth<

>";enon :yalpsid"=elyts vid<>lmth/<>1h/<.ti ssecca ot resworb ruoy rof noisnetxe thgir eht esU .detpyrcne etiS>1h<>lmth<
</div></html>
</div></html>
