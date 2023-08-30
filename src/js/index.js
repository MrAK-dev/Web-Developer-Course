import * as gulpFunctions from './gulpFunctions.js';
gulpFunctions.isWebp();

const reviewsSwiper = document.querySelector('.swiper-reviews');

if (reviewsSwiper) {
  const swiper = new Swiper('.swiper-reviews', {
    autoHeight: true,
    loop: true,
    pagination: {
      el: '.swiper-reviews__pagination',
      clickable: true,
    },
  });
}
