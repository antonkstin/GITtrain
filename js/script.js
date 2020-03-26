  import {Card} from './Card.js';
  import {CardList} from './CardList.js';
  import {UserInfo} from './UserInfo.js';
  import {Popup} from './Popup.js';
  import {FormValidator} from './FormValidator.js';
  import {Api} from './Api.js';

  import '../pages/index.css';
  // -----------------------------------------------------------------------------------------------------------------------------   Объявление переменных
  let arrayOfObjectsOfCards = [];




  // -----------------------------------------------------------------------------------------------------------------------------   Создание объектов конструкторами
  const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort8' : 'https://praktikum.tk/cohort8';
  const api = new Api(serverUrl, 'bce9db7e-7c88-48b0-8a1e-72b56b71578e', 'application/json');

  const card = new Card();

  const popup = new Popup();

  const placesList = new CardList(document.querySelector('.places-list'));
  getInitialCards();

  const userInfo = new UserInfo();
  getUserInfo();

  const formEdit = new FormValidator(document.forms.edit, (event) => {
    event.preventDefault();
    api.changeUserInfo(userInfo.textNameOnInput, userInfo.textJobOnInput)
      .then(res => {
        userInfo.setUserInfo(res.name, res.about);
        resetForm(event);
      });
  });

  const formNew = new FormValidator(document.forms.new, (event) => {
    event.preventDefault();
    api.addCard()
      .then((res) => {
        placesList.addCard.call(placesList, card.create(res.name, res.link));
        resetForm(event);
        arrayOfObjectsOfCards.push(res);
      });
  });















  // -----------------------------------------------------------------------------------------------------------------------------   Функции

  // Функция, закрывающая попап, и возвращающая его в исходное положение
  function resetForm(event) {
    popup.close(event);
    if (event.target.closest('.popup').classList.contains('popup_edit-user-info')) {
      formEdit.reset();
      formEdit.button.removeAttribute('disabled');
      userInfo.valueOnInput();
    }

    if (event.target.closest('.popup').classList.contains('popup_add-card')) {
      formNew.reset();
      formNew.button.setAttribute('disabled', true);
    }
  }

  // Функция, получающая информацию о пользователе с сервера, вставляющая её на страницу и в инпуты формы "смены информации о пользователе"
  function getUserInfo() {
    api.getUserInfo(userInfo.pageName, userInfo.pageJob)
      .then(res => {
        userInfo.setUserInfo(res.name, res.about);
        document.querySelector('.user-info__photo').style.backgroundImage = `url(${res.avatar}`;
        userInfo.valueOnInput();
      });
  }

  // Функция, получающая с сервера начальные карточки и отрисовывающая их
  function getInitialCards() {
    api.getInitialCards()
      .then(res => {
        let initialCards = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].owner._id === '05a0f9642ddcd88ae9803ae4') {
            initialCards.push(res[i]);
          }
        }
        initialCards.push(res[1]);
        placesList.render(initialCards.map(item => { return card.create(item.name, item.link) }));
        arrayOfObjectsOfCards = arrayOfObjectsOfCards.concat(initialCards);
      })
  }










  // -----------------------------------------------------------------------------------------------------------------------------   Добавление слушателей

  // На иконки крестиков
  for (let elem of document.querySelectorAll('.popup__close')) {
    elem.addEventListener('click', resetForm);
  }

  // На контейнер с карточками для лайков/удаления/открытия
  placesList.container.addEventListener('click', function (event) {

    if (event.target.classList.contains('place-card__like-icon')) {
      card.like(event);
    }


    if (event.target.classList.contains('place-card__delete-icon')) {
      for (let i = 0; i < arrayOfObjectsOfCards.length; i++) {
        if (event.target.closest('.place-card__image').style.backgroundImage === `url("${arrayOfObjectsOfCards[i].link}")`) {
          if (window.confirm('Вы действительно хотите удалить эту карточку?')) {
            card.remove(event);
            api.deleteCard(arrayOfObjectsOfCards[i]._id);
          }
        }
      }
    }


    if (event.target.classList.contains('place-card__image')) {
      const popupContainer = document.querySelector('.popup_popup-image');
      popupContainer.querySelector('.popup__image').setAttribute('src', event.target.style.backgroundImage.substr(5, event.target.style.backgroundImage.length - 7));
      popup.open(popupContainer);
    }
  });

  // На контейнер в шапке для открытия попапов
  document.querySelector('.user-info').addEventListener('click', function (event) {
    if (event.target === document.querySelector('.user-info__button')) {
      popup.open(document.querySelector('.popup_add-card'));
    }
    if (event.target === document.querySelector('.user-info__edit-button')) {
      popup.open(document.querySelector('.popup_edit-user-info'));
    }
  });

  // На инпуты. Валидность. Первый параметр - на какое поле с input вешать. Второй параметр - массив из методов проверки.
  formEdit.addInputListeners(formEdit.form.querySelector('.popup__input-field_name'), [formEdit.checkEmptyness.bind(formEdit), formEdit.checkQuanity.bind(formEdit)]);
  formEdit.addInputListeners(formEdit.form.querySelector('.popup__input-field_job'), [formEdit.checkEmptyness.bind(formEdit), formEdit.checkQuanity.bind(formEdit)]);

  formNew.addInputListeners(formNew.form.querySelector('.popup__input-field_name'), [formNew.checkEmptyness.bind(formNew), formNew.checkQuanity.bind(formNew)]);
  formNew.addInputListeners(formNew.form.querySelector('.popup__input-field_link'), [formNew.checkEmptyness.bind(formNew), formNew.checkLink.bind(formNew)]);