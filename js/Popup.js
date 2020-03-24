export class Popup {  
  
    // Закрываю формы
    close(event) {
      event.target.closest('.popup').classList.remove('popup_is-opened');
    }
  
    // Открыл формы
    open(item) {
      item.classList.add('popup_is-opened');
    }
  
  }