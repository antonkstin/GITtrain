class CardList {
  
  constructor(container) {
      this.container = container;
    }


    // Взял блок карточки из Card, занес туда свои данные и вставил в родителя container
    addCard = (card) => {
      this.container.appendChild(card);
    }

    // Отрисовка начальных карточек
    render(array) {
      for (let elem of array) {
        this.addCard(elem);
      }
    }
  }