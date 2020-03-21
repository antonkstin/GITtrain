class UserInfo {
    constructor() {
      this.pageName = document.querySelector('.user-info__name');;
      this.pageJob = document.querySelector('.user-info__job');
      this.textNameOnInput = document.forms.edit.elements.name;
      this.textJobOnInput = document.forms.edit.elements.job;
    }
  
  
    // В строки input вставил значения с сайта
    valueOnInput() {
      this.textNameOnInput.value = this.pageName.textContent;
      this.textJobOnInput.value = this.pageJob.textContent;
    }
  
    // Записал на страницу новые значения информации пользователя
    setUserInfo(name, job) {
      this.pageName.textContent = name;
      this.pageJob.textContent = job;
    }

  }