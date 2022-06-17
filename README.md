# README

## Task

- Создать бота, который будет говорить по команде `\day` верхняя неделя или нижняя.
- Создать бота, который будет говорить по команде `\day 2021-09-01` верхняя неделя или нижняя.

## How to run the app

Запуск на сервере:

```bash
npm i
cp .env.txt .env
# Пишем в .env свой token от бота
npm run start
```

Запуск для разработки:

```bash
npm i
cp .env.txt .env
# Пишем в .env свой token от бота
npm run dev
```

## Application task

- [Visual Studio Code](https://code.visualstudio.com/)
- [NodeJS](https://nodejs.org/en/)
  - dotenv - Для того, чтобы хранить переменные в файле `.env`.
  - node-telegram-bot-api - Для того, чтобы работать с телеграм ботом.
  - nodemon - Для того, чтобы не выполнять команду `node src/index.js` при каждом написании кода.

## Folder structure

```bash
sudo apt install tree
tree --charset ascii -I node_modules
```

```
.
|-- LICENSE
|-- README.md
|-- package-lock.json
|-- package.json
`-- src
    |-- *.js
    `-- index.js
```
