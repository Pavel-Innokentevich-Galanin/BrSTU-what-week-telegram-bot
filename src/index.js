require('dotenv').config();

const TelegramApi = require('node-telegram-bot-api');
const whatWeekend = require('./WhatWeekend');

const token = process.env.token;
console.log(token);

const array_commands = [
  {
    command: '/start',
    description: 'Прывітанне',
  },
  {
    command: '/day',
    description: 'Тып тыдня ў БрДТУ (Пэўная дата: `/day 2021-09-01`)',
  },
  {
    command: '/about',
    description: 'Пра праграміста',
  },
];

const bot = new TelegramApi(token, { polling: true });

const start = async () => {
  bot.setMyCommands(array_commands);
  bot.on('message', async (message) => {
    const text = message.text;
    const chatId = message.chat.id;

    try {
      if (text === '/start') {
        let str_commands = array_commands
          .map((element) => {
            return ` - ${element.command} - ${element.description} \n`;
          })
          .join('');

        let msg = '';
        // msg += '<b>Каманда</b>: \n';
        // msg += '<pre>/start</pre>\n\n';
        msg += 'Прывітанне! \n\n';
        msg += 'Што я магу: \n';
        msg += `${str_commands}`;

        await bot.sendMessage(chatId, msg, {
          parse_mode: 'HTML',
          reply_to_message_id: message.message_id,
        });
        return;
      }

      if (text === '/day') {
        await bot.sendMessage(chatId, `${whatWeekend()}`, {
          parse_mode: 'HTML',
          reply_to_message_id: message.message_id,
        });
        return;
      }

      if (text.split(' ')[0] === '/day') {
        const string_date = text.split(' ')[1];
        await bot.sendMessage(chatId, `${whatWeekend(string_date)}`, {
          parse_mode: 'HTML',
          reply_to_message_id: message.message_id,
        });
        return;
      }

      if (text === '/about') {
        let msg = '';
        // msg += '<b>Каманда</b>: \n';
        // msg += '<pre>/about</pre>\n\n';
        msg += '<b>Распрацаваў</b>: \n';
        msg += 'студэнт факультэта ЭIС \n';
        msg += '3 курса VI семестра \n';
        msg += 'групы ПЗIТ-4 (1) \n';
        msg += 'Галанiн П. I. \n';
        msg += `\n`;
        msg += `<b>GitHub</b>: https://github.com/Pavel-Innokentevich-Galanin`;
        await bot.sendMessage(chatId, msg, {
          parse_mode: 'HTML',
          disable_web_page_preview: true,
          reply_to_message_id: message.message_id,
        });
        return;
      }

      await bot.sendMessage(
        chatId,
        'Я цябе не разумею. Паспрабуй яшчэ раз :)',
        {
          reply_to_message_id: message.message_id,
        }
      );
      return;
    } catch (e) {
      console.log(e);
      bot.sendMessage(chatId, '' + e);
      return bot.sendMessage(
        chatId,
        'Адбылася памылка на серверы. Выклікай праграміста :)',
        {
          reply_to_message_id: message.message_id,
        }
      );
    }
  });
};

start();
