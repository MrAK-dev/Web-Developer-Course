import * as gulpFunctions from './gulpFunctions.js';
gulpFunctions.isWebp();
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const close = document.querySelector('.menu__close');
const overlay = document.querySelector('.menu__overlay');

hamburger.addEventListener('click', () => {
  menu.classList.add('active');
});

close.addEventListener('click', () => {
  menu.classList.remove('active');
});

overlay.addEventListener('click', () => {
  menu.classList.remove('active');
});

const percentages = document.querySelectorAll('.progress-bar__percentage');
const lines = document.querySelectorAll('.progress-bar__scale_full');

percentages.forEach((el, index) => {
  lines[index].style.width = el.innerHTML;
});
