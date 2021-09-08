// передаем в функцию главный селектор чтобы навесить делегироваие событий на родителя 
// переаем каждый отдельный там на котором произошел клик
// контент селектор
//класс активности

const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = "block") => {
    // получаем элементы 
    const header = document.querySelector(headerSelector),
        tab = document.querySelectorAll(tabSelector),
        content = document.querySelectorAll(contentSelector);
    // создаем две функции одна будет показывать нужный контент а другая скрывать 
    function hideTabContent() {
        content.forEach(item => {
            item.style.display = "none";
        });
        // убираем класс активности у ненужный табов 
        tab.forEach(item => {
            item.classList.remove(activeClass);
        });
    }
    // Нужен аргумент чтобы код отслеживал на какой по счету элемент нажал пользователь
    function showTabContent(i = 0) {
        content[i].style.display = display;
        tab[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    // использование делегирование событий чтобы отследить в какой таб кликнул пользователь

    header.addEventListener('click', (event) => {
        // т.к. часто будет использовать куда кликнул пользователь помещаем event.target в отдельную переменную
        const target = event.target;
        // условие проверяющее а точно ли пользователь кликнул туда куда задумано
        // для этого смотрим есть ли у цели нужный нам класс
        // с помощью руглярных выражений убираем точку из селектора тк уже использован classList
        // replace - два аргумента 1 регулярное выражение 2 на что будем заменять
        if (target && target.classList.contains(tabSelector.replace(/\./, "")) ||
            target.parentNode.classList.contains(tabSelector.replace(/\./, ""))) {
            // определяем точно в какой по счету элемент кликнул пользователь
            // item - элемент, i - номер элемента
            tab.forEach((item, i) => {
                if (target == item || target.parentNode == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }

    });
};

export default tabs;