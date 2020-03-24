export class Api {
  constructor(ip, authorization, contentType) {
    this.link = ip;
    this.authorization = authorization;
    this.contentType = contentType;
  }

  getUserInfo() {
    return fetch(this.link + '/users/me', {
      headers: {
        authorization: this.authorization
      }
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch(err => {console.log(`Ошибка ${err}`)});
  }

  changeUserInfo(name, job) {
    return fetch(this.link + '/users/me',{
      method: 'PATCH',
      headers: {
        authorization: this.authorization,
        'Content-Type': this.contentType
      },
      body: JSON.stringify({
        name: name.value,
        about: job.value
      })
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        } 
        return Promise.reject(res.status);
      })
      .catch(err => {console.log(`Ошибка ${err}`)});
  }   

  getInitialCards() {
    return fetch(this.link + '/cards', {
      headers: {
        authorization: this.authorization
      }
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch(err => {console.log(`Ошибка ${err}`)});
  }

  addCard() {
    return fetch(this.link + '/cards', {
      method: 'POST',
      headers: {
        authorization: this.authorization,
        'Content-Type': this.contentType
      },
      body: JSON.stringify({
        name: document.forms.new.elements.name.value,
        link: document.forms.new.elements.link.value
      })
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch(err => {console.log(`Ошибка ${err}`)});
  }

  deleteCard(id) {
    fetch(this.link + '/cards/' + id, {
      method: 'DELETE', 
      headers: {
        authorization: this.authorization,
        'Content-Type': this.contentType
      },
    })
      .then(res => {
        if(!res.ok) {
          return Promise.reject(res.status);
        }
      })
      .catch(err => {console.log(`Ошибка ${err}`)});
  }

}