(function () {

  // -----------------------------------------------------------------------------------------------------------------------------   Объявление переменных
  let arrayOfObjectsOfCards = [];




  // -----------------------------------------------------------------------------------------------------------------------------   Создание объектов конструкторами

  const api = new Api('https://praktikum.tk/cohort8', 'bce9db7e-7c88-48b0-8a1e-72b56b71578e', 'application/json');

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
        placesList.addCard(card.create(res.name, res.link));
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
  formEdit.addInputListeners(formEdit.form.querySelector('.popup__input-field_name'), [formEdit.checkEmptyness, formEdit.checkQuanity]);
  formEdit.addInputListeners(formEdit.form.querySelector('.popup__input-field_job'), [formEdit.checkEmptyness, formEdit.checkQuanity]);

  formNew.addInputListeners(formNew.form.querySelector('.popup__input-field_name'), [formNew.checkEmptyness, formNew.checkQuanity]);
  formNew.addInputListeners(formNew.form.querySelector('.popup__input-field_link'), [formNew.checkEmptyness, formNew.checkLink]);



})();
/**
 * Здравствуйте. Я вернул свой комментарий в самом низу.
 *
 * Id ключ который вы перенесли в этот файл, а именно '05a0f9642ddcd88ae9803ae4', необходимо убрать в отдельную переменную(константу).
 *
 *
 * Когда вы пишите код для себя, вы вправе писать как вам хочется, с условием что кроме вас, ваш код никто не увидит, никогда.
 * Когда вы пишите код который увидят другие, оценивают, стараются проанализировать и выявить ошибки, код должен быть простым, доступным, красиво оформленным
 * Тот код который у вас возвращает не return сложный для моего анализа или другого программиста, с опытом. Работа в комманде программистов над
 * проектом, Вы будете обязаны писать доступный и главное легко поддерживаемый код. Когда вы пишите код, задайте себе один вопрос - "Сможете ли вы
 * разобраться и вспомнить в этом коде что вы написали через год затратив на это немного времени..."
 *
 * В большенстве своём любая функция возвращает BOOL если выполнилась успешно true или не выполнилось false. Это очевидно.
 * Функция может вернуть число, если функция выполняет математические операции.
 * -ПОЧЕМУ МНЕ НАДО ПОМЕНЯТЬ, ЕСЛИ ЭТО СЧИТАЕТСЯ ОДНИМ И ТЕМ ЖЕ?
 * Это не одно и то же 1 !== true
 *
 *
 *
 * Про индексы по которым нельзя обращаться. Это достаточно объёмный материал который подробно в рамках ревью не раскрыть.
 * Как минимум могу сказать что вы сможете добавить элемент с таким же именем который по случайности станет перед тем индексом
 * который вы используете, после модификации DOM, по итогу код перестанет работать полность. Второй случай это массив с данными
 * в котором получание и удаление данных сама по себе операция является динамической и отследить во всех местах достаточно накладно.
 *
 * Вашу работу я принимаю и желаю вам удачи в дальнейшем обучении...
 *
 */




/*

Я НЕ ПОНИМАЮ, ПОЧЕМУ СЕЙЧАС ВЫ УКАЗЫВАЕТЕ НА ОШИБКЕ ПО ПРОШЛОЙ РАБОТЕ, ЕСЛИ ЕЁ ПРИНЯЛИ.
В ЭТОЙ РАБОТЕ ОЧЕНЬ МНОГО ЗАДАНИЙ. ДЕЛО И ТАК ТЯЖЕЛО ИДЕТ, И МНЕ ХОЧЕТСЯ ДОПОЛНИТЕЛЬНЫЕ ВСЕ РАЗОБРАТЬ УСПЕТЬ,
ПОДУМАТЬ НАД НИМИ, А ВЫ НАХОДИТЕ ВСЕ НОВЫЕ НЕДОЧЕТЫ ИЗ "ПРОШЛОГО"!

ТАКЖЕ ХОЧУ ЗАМЕТИТЬ ВЫ ВСЕГДА ПИШЕТЕ БЕЗ АРГУМЕНТОВ: "Надо исправить : Не правильно использовать индексы и обращаться по индексу к элементу"
А ПОЧЕМУ НЕПРАВИЛЬНО? ИЗ-ЗА ЧЕГО? Я ТАК И НЕ УЗНАЮ... ЛАДНО, ДУМАЮ, ИСПРАВЛЮ, ЧТО УЖ. НО СЛЕДУЮЩЕЕ ЗАМЕЧАНИЕ ПО ПОВОДУ return :
"В классе FormValidator вы возвращаете 0 или 1, поменяйте на true или false." ПОЧЕМУ МНЕ НАДО ПОМЕНЯТЬ, ЕСЛИ ЭТО СЧИТАЕТСЯ ОДНИМ И ТЕМ ЖЕ?
ОПЯТЬ БЕЗ АРГУМЕНТОВ. НАЙС УЧЕБА :)

А Я ОБЪЯСНЮ ПОЧЕМУ Я ВОЗВРАЩАЮ НЕ TRUE/FALSE (ЭТО НЕ МОЕ НЕЗНАНИЕ, ЭТО Я ПРИДУМАЛ ТАКУЮ ЛОГИКУ)
ПОСКОЛЬКУ В ВАШЕМ ЗАДАНИИ ЕСТЬ 2 ПРОВЕРКИ ИНПУТА:

ОДНА ПРОВЕРЯЕТ ЧТОБЫ СИМВОЛОВ БЫЛО (>0) *БОЛЬШЕ НУЛЯ*
ВТОРАЯ ПРОВЕРЯЕТ, ЧТОБЫ СИМВОЛОВ БЫЛО (30>X>2) *ОТ ДВУХ ДО ТРИДЦАТИ*
ВО-ПЕРВЫХ: НЕТ СМЫСЛА В ПЕРВОЙ ПРОВЕРКЕ, ЕСЛИ ОНА И ТАК ВХОДИТ ВО ВТОРУЮ *МЕНЬШЕ ДВУХ И БОЛЬШЕ ТРИДЦАТИ ЭТО ВСЕГДА БОЛЬШЕ НУЛЯ*

ВО-ВТОРЫХ: JS ДОЛЖЕН ПОНИМАТЬ КОГДА НУЖНО СКРЫВАТЬ СООБЩЕНИЕ ОБ ОШИБКЕ. ДЛЯ ЭТО Я И ВВЕЛ СЧЕТЧИК, КОТОРЫЙ ГОВОРИТ, ЧТО ЕСЛИ ЕСТЬ ХОТЬ ОДНА ОШИБКА,
ТО НИЧЕГО СКРЫВАТЬ НЕ НАДО! (ЕСЛИ ЕСТЬ ОШИБКА Я +1 СЧЕТЧИК). А ЕСЛИ БЫ Я ВОЗВРАЩАЛ TRUE/FALSE, ТО ПРЕДСТАВИМ СЛУЧАЙ:
*НЕТ СИМВОЛОВ* - СНАЧАЛА ПРОХОДИТ ПРОВЕРКА НА ПУСТОТУ И ВЫДАЕТ TRUE (ТО ЕСТЬ ПОКАЖИ ОШИБКУ JS ЧТО НЕТ СИМВОЛОВ)
ПОТОМ ПРОХОДИТ ПРОВЕРКА НА КОЛИЧЕСТВО СИМВОЛОВ И ВЫДАЕТ FALSE (ПОТОМУ ЧТО INPUT.VALIDITY.TOOSHORT ВЫДАЕТ FALSE НА ЭТОТ СЛУЧАЙ И Я НЕ ЗНАЮ ПОЧЕМУ. ХОТЯ СИМВОЛОВ МЕНЬШЕ ДВУХ)
ПО ИТОГУ ИМЕЕМ СЧЕТЧИК С FALSE КОТОРЫЙ СОТРЕТ ПЕРВОНАЧАЛЬНУЮ ОШИБКУ. ЧТОБЫ ТАКОГО НЕ ДОПУСТИТЬ, Я ДОЛЖЕН НЕ ПЕРЕПИСЫВАТЬ СЧЕТЧИК, А ОБРАБАТЫВАТЬ ВСЕ TRUE/FALSE,
ПОСТУПИВШИЕ НА НЕГО. НО ЭТО ЛИШНИЕ МАССИВЫ И ПЕРЕБОРЫ. А Я РЕШИЛ СДЕЛАТЬ ПО-ПРОСТОМУ, ВОЗВРАЩАТЬ 1 И 0. НАДЕЮСЬ ЯСНО ОБЪЯСНИЛ.

*/








/**
* Здравствуйте.
*
* Можно лучше: Старайтесь задавать переменным более понятные названия, чтобы по названию было понятно
* за что отвечает та или иная переменная, это важно для понимания того за что отвечает переменная.
*
* ====================
*
* Что надо исправить:
*
  *  Надо исправить: Для реализации вы создавали в прошлом спринте отдельные классы.
  *  Не переносите и не дублируйте реализацию в  класс Api, С класса можно только возвращать данные
  *  Которые получены от сервера. Это надо удалить
  *  Надо возвращать просто данные и за одно преобразовать в нужный формат
  * .then(res => { if (res.ok) { return res.json();   } })
  *
  *
  *  Надо исправить : Не правильно использовать индексы и обращаться по индексу к элементу
  *
          Надо исправить: Необходимо вынести такие параметры как IP адрес, данные авторизации ссылки и так далее за класс и передавать
         в качестве параметра при инициализации класса


  Надо исправить. В классе FormValidator вы возвращаете 0 или 1, поменяйте на true или false.
  сейчас у вас вот так
      checkInputValidity(field, textError) {
      if(!textError) {
        field.querySelector('.popup__error-message').textContent = '';
      } else {
        field.querySelector('.popup__error-message').textContent = textError;
      }
    }
    checkEmptyness = (input, field) => {
      if (input.validity.valueMissing) {
        this.checkInputValidity(field, this.errorMessages.empty);
        return 1;
      } else {
        return 0;
      }
    }
А можно сделать примерно так
      checkInputValidity(field, textError) {
        field.querySelector('.popup__error-message').textContent = '';
        return false;
      if(textError) {
        field.querySelector('.popup__error-message').textContent = textError;
        return true;
      }
    }
    checkEmptyness = (input, field) => {
      if (input.validity.valueMissing) {
      return this.checkInputValidity(field, this.errorMessages.empty);
      }
    }



  * Надо исправить : Не правильно использовать индексы и обращаться по индексу к элементу
    посмотрите выше я пометил где вы это делаете



* Важный момент :
* работа принимается только при исправлении всех "Надо исправить" и полностью рабочем функционале
* Перед тем как отправить работу на приёмку, проверьте на ошибки в консоли, и весь функционал
*
*
*/