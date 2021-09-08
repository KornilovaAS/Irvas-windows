const images = () => {
    // создаем модальное окно
    const imgPopup = document.createElement('div'),
        // получаем общий блок для всех изображений
        workSection = document.querySelector('.works'),
        // создаем изображение 
        bigImage = document.createElement('img');

    imgPopup.classList.add('popup_engineer');
    // размещаем наше модальное окно в рабочей секции
    workSection.appendChild(imgPopup);
    // выравниваем наше изображение по центру согласно технического задания 
    imgPopup.style.justifyContent = 'center';
    imgPopup.style.alignItems = 'center';
    imgPopup.style.display = 'none';
    bigImage.style.width = 540 + 'px';
    bigImage.style.height = 540 + 'px';



    // помещаем в созданное модальное окно изображение 
    imgPopup.appendChild(bigImage);

    //вешаем обработчик событий на всю большую секцию - делегирование событий - обязательно исп event
    workSection.addEventListener('click', (event) => {
        event.preventDefault();

        let target = event.target;
        // делегирование - условия поддерживается ли клик и есть ли у элемента нужный класс
        if (target && target.classList.contains('preview')) {
            //  показываем модальное окно
            imgPopup.style.display = 'flex';
            // нам надо показать именно ту картинку куда кликнул пользователь 
            // path - пер. путь, дорожка
            //элемент на котором произошло событий обращаемся к родителю (родительский узел)
            const path = target.parentNode.getAttribute('href');
            bigImage.setAttribute('src', path);
            document.body.style.overflow = "hidden";

        }
        // условие когда мы кликаем на подложку модальное окно должно закрываться 
        //target.matches - совпадение - передаем селектор по которому будем искать совпадение 
        if (target && target.matches('div.popup_engineer')) {
            imgPopup.style.display = 'none';
            document.body.style.overflow = "";
        }

    });

};

export default images;