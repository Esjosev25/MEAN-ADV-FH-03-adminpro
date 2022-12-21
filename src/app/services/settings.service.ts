import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private tema = document.querySelector('#theme');
  constructor() {
    let temaUrl =
      localStorage.getItem('theme') || './assets/css/colors/default-theme';

    this.tema?.setAttribute('href', temaUrl);
  }
  changeTheme(tema: string) {
    this.tema = document.querySelector('#theme');
    const url = `./assets/css/colors/${tema}.css`;
    this.tema?.setAttribute('href', url);

    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const links = document.querySelectorAll('.selector');
    links.forEach((elem) => {
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.tema?.getAttribute('href');
      if (btnThemeUrl === currentTheme) elem.classList.add('working');
    });
  }
}
