export class Card {

  like(event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }

  remove(event) {
    event.currentTarget.removeChild(event.target.closest('.place-card'));
  }

  create(name, link) {
    // Создал элементы DOM
    const cardElement = document.createElement('div');
      const cardImage = document.createElement('div');
        const deleteIcon = document.createElement('button');
      const cardDescription = document.createElement('div');
        const cardName = document.createElement('h3');
        const likeContainer = document.createElement('div');
          const likeIcon = document.createElement('button');
          const likeCounter = document.createElement('p');
              
    // Добавил им соответствующие классы
    cardElement.classList.add('place-card');
    cardImage.classList.add('place-card__image');
    deleteIcon.classList.add('place-card__delete-icon');
    cardDescription.classList.add('place-card__description');
    cardName.classList.add('place-card__name');
    likeContainer.classList.add('place-card__like-container');
    likeIcon.classList.add('place-card__like-icon');
    likeCounter.classList.add('place-card__like-counter');

    // Добавил данные для имени и ссылки
    cardImage.style.backgroundImage = `url(${link})`;
    cardName.textContent = name;
    likeCounter.textContent = 0;

    // Вложил элементы друг в друга
    cardElement.appendChild(cardImage);
    cardElement.appendChild(cardDescription);
    cardImage.appendChild(deleteIcon);
    cardDescription.appendChild(cardName);
    cardDescription.appendChild(likeContainer);
    likeContainer.appendChild(likeIcon);
    likeContainer.appendChild(likeCounter);

    return cardElement;
  }

}