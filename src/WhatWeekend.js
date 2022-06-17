/**
 * Функция возвращает сообщение о типе недели (верхняя или нижняя)
 */
function getWeekType(string_date) {
  try {
    let d = new Date(string_date);

    if (d == 'Invalid Date') {
      d = new Date();
    }

    let d1 = d;

    let mounth = d.getMonth() + 1; // Определяем номер месяца
    if (mounth >= 1 && mounth <= 8) {
      // Если месяц Январь - Август, то берём прошлый год
      let year = d.getFullYear() - 1;
      d = new Date(`${year}-09-01`);
    } else {
      // Если месяц Сентябрь - Декабрь, то берём текущий год
      let year = d.getFullYear();
      d = new Date(`${year}-09-01`);
    }

    let weeks = []; // Массив недель. Массив массивов дней недели
    let days = []; // Массив дней недели
    for (let i = 0; i < 365; ++i) {
      if (d.getDay() === 1) {
        // Если это первый день недели, то добавить в массив недель
        if (days.length != 0) {
          weeks.push(days);
        }
        days = [];
      }

      days.push(d.toJSON()); // Добавляю день в массив дней недели
      d.setDate(d.getDate() + 1); // Сетаю новую дату
    }
    weeks.push(days); // Добавляю оставший массив дней недел в массив недель

    let type = getWeekIndex(weeks, d1); // Вызываю функцию, которая определяет номер недели
    if (type == -1) {
      let msg = 'Памылка ў кодзе праграмы. \n\n';
      msg += 'Функцыя: <pre>getWeekIndex()</pre> \n';
      return msg;
    }

    let result_msg = '';
    // result_msg += `<b>Каманда</b>: \n`;
    // result_msg += `<pre>/day ${d1.toJSON()}</pre>\n\n`;
    result_msg += `<b>Тып тыдня ў БрДТУ</b>: \n`;

    if (type % 2 == 0) {
      result_msg += `верхнi тыдзень\n\n`;
      result_msg += printDate(d1);
      return result_msg;
    } else {
      result_msg += `нiжнi тыдзень \n\n`;
      result_msg += printDate(d1);
      return result_msg;
    }
  } catch (e) {
    console.log(e);
    return '' + e;
  }
}

/**
 * Функция, по созданому массиву недель
 * (массив с 1-ого сентября и 365 дней)
 * возвращает номер недели.
 * [Если чётное число (индексация от нуля) - верхняя неделя]
 * [Если нечётное число - нижняя неделя]
 */
function getWeekIndex(weeks = [[]], d1 = new Date()) {
  let date_1 = d1.getDate(); // Определяю текущий день
  let mount_1 = d1.getMonth(); // Определяю текущий месяц
  for (let i = 0; i < weeks.length; ++i) {
    // Прохожусь по массиву недель
    for (let j = 0; j < weeks[i].length; ++j) {
      // Прохожусь по массиву дней недели
      let d2 = new Date(weeks[i][j]); // Определяю объект дня недели
      let date_2 = d2.getDate(); // Определяю дату дня недели
      let mount_2 = d2.getMonth(); // Определяю месяц дня недели
      if (date_1 == date_2 && mount_1 == mount_2) {
        return i; // Если даты и месяцы равны, то возвращаем номер недели
      }
    }
  }
  return -1; // Какая-то ошибка
}

/**
 * Функция, которая печатает дату в формета YYYY-MM-DD_HH-MM-SS
 */
function printDate(d = new Date()) {
  const year = d.getFullYear();

  let mounth = d.getMonth() + 1;
  mounth = mounth < 10 ? `0${mounth}` : `${mounth}`;

  let date = d.getDate();
  date = date < 10 ? `0${date}` : `${date}`;

  let hour = d.getHours();
  hour = hour < 10 ? `0${hour}` : `${hour}`;

  let minutes = d.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  let seconds = d.getSeconds();
  seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  // return `${year}-${mounth}-${date}_${hour}-${minutes}-${seconds}`;

  let msg = '';
  msg += `<b>Дата</b>: \n`;
  msg += `${year}.${mounth}.${date} \n\n`;

  switch (mounth) {
    case '01':
      mounth = 'студзень (January)';
      break;
    case '02':
      mounth = 'люты (February)';
      break;
    case '03':
      mounth = 'сакавiк (March)';
      break;
    case '04':
      mounth = 'красавiк (April)';
      break;
    case '05':
      mounth = 'травень (May)';
      break;
    case '06':
      mounth = 'чэрвень (June)';
      break;
    case '07':
      mounth = 'лiпень (July)';
      break;
    case '08':
      mounth = 'жнiвень (August)';
      break;
    case '09':
      mounth = 'верасень (Semtember)';
      break;
    case '10':
      mounth = 'кастрычнiк (October)';
      break;
    case '11':
      mounth = 'лiстапад (November)';
      break;
    case '12':
      mounth = 'снежань (December)';
      break;
    default:
      mounth = `${mounth} - Памылка ў кодзе праграмы.`;
      break;
  }

  msg += `<b>Месяц</b>: \n`;
  msg += `${mounth} \n\n`;

  let day = d.getDay();
  switch (day) {
    case 0:
      day = 'нядзеля (Sunday)';
      break;
    case 1:
      day = 'панядзелак (Monday)';
      break;
    case 2:
      day = 'аўторак (Thuesday)';
      break;
    case 3:
      day = 'серада (Wednesday)';
      break;
    case 4:
      day = 'чацвер (Thursday)';
      break;
    case 5:
      day = 'пятнiца (Friday)';
      break;
    case 6:
      day = 'субота (Saturday)';
      break;
    default:
      day = `${day} - Памылка ў кодзе праграмы.`;
      break;
  }

  msg += `<b>Дзень тыдня</b>: \n`;
  msg += `${day} \n\n`;

  msg += `<b>Час</b>: \n`;
  msg += `${hour}:${minutes}:${seconds} \n\n`;

  return msg;
}

function main() {
  console.log(getWeekType());
  console.log(' = = = = = ');
  const d = new Date('2021-09-01');
  for (let i = 0; i < 365; ++i) {
    console.log(getWeekType(d));
    d.setDate(d.getDate() + 1);
  }
}

// main();

module.exports = getWeekType;
