export class FormValidator {

    constructor(form, func) {
      this.form = form;
      this.fields = form.querySelectorAll('.popup__input-field');
      this.button = form.querySelector('.button');
      this.addButtonListeners(form, func);
      this.errorMessages = {
        empty: 'Это обязательное поле',
        twothirty: 'Должно быть от 2 до 30 символов',
        isntLink: 'Здесь должна быть ссылка'
      }
    }
  
  
    // Отображение/скрытие ошибки
    checkInputValidity(field, textError) {
      if(!textError) {
        field.querySelector('.popup__error-message').textContent = '';
      } else {
        field.querySelector('.popup__error-message').textContent = textError;
      }
    }
  
    // Валидационные методы
    checkEmptyness(input, field) {
      if (input.validity.valueMissing) {
        this.checkInputValidity(field, this.errorMessages.empty);
        return 1;
      } else {
        return 0;
      }
    }
  
    checkQuanity(input, field) {
      if (input.validity.tooShort) {
        this.checkInputValidity(field, this.errorMessages.twothirty);
        return 1;
      } else {
        return 0;
      }
    }
  
    checkLink(input, field) {
      if (input.validity.patternMismatch) {
        this.checkInputValidity(field, this.errorMessages.isntLink);
        return 1;
      } else {
        return 0;
      }
    }
  
    // Метод вкл/выкл кнопку формы
    setSubmitButtonState() {
      let counter = '';
      for (let elem of this.fields) {
        counter += elem.querySelector('.popup__error-message').textContent;
        if(!elem.querySelector('.popup__input').value) {
          counter += 'empty';
        }
      }
      if (!counter) {
        this.button.removeAttribute('disabled');
      } else {
        this.button.setAttribute('disabled', true);
      }
    }
  
    // Добавил обработчик на input. На нем идет выполнение сразу нескольких функций
    addInputListeners(field, array) {
      const input = field.querySelector('.popup__input');
      input.addEventListener('input', () => {
        let counter = 0;
        for (let elem of array) {
          counter += elem(input, field);
        }
        if(!counter) {
          this.checkInputValidity(field, '');
        }
        this.setSubmitButtonState();
      });
    }
  
    // Добавил обработчики на submit формы
    addButtonListeners(form, func) {
      form.addEventListener('submit', func);
  
      form.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          func;
        }
      });
    }
  
    // Сбрасывание формы и очистка от ошибок
    reset() {
      this.form.reset();
      for (let elem of this.fields) {
        this.checkInputValidity(elem, '');
      }
    }
  }