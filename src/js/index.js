import * as gulpFunctions from './gulpFunctions.js';
gulpFunctions.isWebp();

const body = document.querySelector('body');
const burgerMenuIcon = document.querySelector('.icon-menu');
const menu = document.querySelector('.menu');

burgerMenuIcon.addEventListener('click', () => {
  menu.classList.toggle('active');
  body.classList.toggle('lock');
});
