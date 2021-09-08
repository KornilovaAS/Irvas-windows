const closeModalWindow = (modalSelector) => {

    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''; // пустая строка браузер сам вернет прокручивание

};

export default closeModalWindow