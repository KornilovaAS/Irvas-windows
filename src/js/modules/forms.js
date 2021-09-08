import checkNumInputs from './checkNumInputs';
import closeModalWindow from './closeModalWindow';
import { data } from 'jquery';

const forms = (state) => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input');

    checkNumInputs('input[name="user_phone"]');



    const message = {
            loading: 'Загрузка...',
            success: 'Спасибо! Мы скоро с вами свяжемся!',
            failure: 'Что-то пошло не так...'
        }
        // функция отвечающая за отправку запроса 
    const postData = async(url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });
        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = "";
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (event) => {
            event.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item); //создаем конструктов который соберет все данные с импутов и поместит в переменную formData
            if (item.getAttribute('data-calc') == "end") {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }
            postData('assets/server.php', formData) //тк здесь возвращается промис прописываем цепочку
                .then(res => {
                    statusMessage.textContent = message.success;
                })
                .catch(() => {
                    statusMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        closeModalWindow('.popup_calc_end');
                    }, 3000);
                });
        });
    });
};

export default forms;