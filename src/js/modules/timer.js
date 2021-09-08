// аргументы 1 в какой элемент таймер будем рендерить - уникальный ид элемента на странице
// 2 дедлайн, т.е до какого времени будет идти таймер
const timer = (id, deadLine) => {
    // remaining - пер. осталось
    // getTimeRemaining - будет получать дедлайн и выдавать сколько времени осталось до конца акции
    const getTimeRemaining = (endTime) => {
        // вычисляем столько времени осталось между дедлайном и текущем временем в настоящий момент
        // parse - принимает строку с датой записанной в определенном формате и вернет сколько прошло с 1970 года 
        // когда мы создаем объект new Date туда сразу записывается наша текущая дата, время до милисекунды 
        const t = Date.parse(endTime) - Date.parse(new Date()),
            // далее считаем количество секунд, минут и часов которые необходимо отобразить
            days = Math.floor(t / (1000 * 60 * 60 * 24)), // Math.floor округляет значение до целого числа
            // узнали сколько осталось суток до окнчания акции
            hours = Math.floor((t / (1000 * 60 * 60) % 24)), // находим хвостик часов от полных суток, который 
            // и будем помещать в окошко часы
            minutes = Math.floor((t / (1000 * 60) % 60)),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }; // возвращаем объект
    };
    // пишем функцию которая подставляет ноль для красоты отображения единиц в счетчике
    function getZiro(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }
    // пишем функцию которая будет устанавливать наши значения на страничку
    const setClock = (selector, endTime) => {
        // находим элементы на странице с кот будем взаимодействовать
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        // вручную запустим функцию updateClock чтобы не было задержки отображения правильного счетчика!
        updateClock();

        // функция обновляющая наш таймер каждую секунду
        function updateClock() {
            const t = getTimeRemaining(endTime);

            days.textContent = getZiro(t.days);
            hours.textContent = getZiro(t.hours);
            minutes.textContent = getZiro(t.minutes);
            seconds.textContent = getZiro(t.seconds);

            if (t.total <= 0) {
                days.textContent = "00";
                hours.textContent = "00";
                minutes.textContent = "00";
                seconds.textContent = "00";

                clearInterval(timeInterval);

            }
        }

    };
    setClock(id, deadLine);

};

export default timer;