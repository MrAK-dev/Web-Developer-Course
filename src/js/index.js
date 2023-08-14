import * as gulpFunctions from './gulpFunctions.js';
gulpFunctions.isWebp();

const body = document.querySelector('body');
const burgerMenuIcon = document.querySelector('.icon-menu');
const menuBody = document.querySelector('.menu__body');

burgerMenuIcon.addEventListener('click', () => {
  menuBody.classList.toggle('menu-open');
  burgerMenuIcon.classList.toggle('menu-open');
  body.classList.toggle('lock');
});
