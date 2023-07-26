import Swiper from 'swiper';
import {
  Navigation,
  Pagination,
  Parallax,
  Autoplay,
  Thumbs,
} from 'swiper/modules';
import 'swiper/css';

const buildSliders = () => {
  const sliders = document.querySelectorAll(
    '[class*="__swiper"]:not(.swiper-wrapper)'
  );
  if (sliders) {
    sliders.forEach((slider) => {
      slider.parentElement.classList.add('swiper');
      slider.classList.add('swiper-wrapper');
      for (const slide of slider.children) {
        slide.classList.add('swiper-slide');
      }
    });
  }
};

const initSliders = () => {
  buildSliders();

  if (document.querySelector('.main-block__slider')) {
    new Swiper('.main-block__slider', {
      modules: [Navigation, Pagination, Parallax, Autoplay],
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 800,
      loop: true,
      parallax: true,
      pagination: {
        el: '.controll-main-block__dots',
        clickable: true,
      },
      on: {
        init: (swiper) => {
          const allSlides = document.querySelector('.fraction-controll__all');

          allSlides.innerHTML =
            swiper.slides.length < 10
              ? `0${swiper.slides.length}`
              : swiper.slides.length;
        },
        slideChange: (swiper) => {
          const currentSlide = document.querySelector(
            '.fraction-controll__current'
          );
          currentSlide.innerHTML =
            swiper.realIndex + 1 < 10
              ? `0${swiper.realIndex + 1}`
              : swiper.realIndex + 1;
        },
      },
    });
  }

  if (document.querySelector('.products-slider__slider')) {
    new Swiper('.products-slider__slider', {
      modules: [Navigation, Pagination, Autoplay],
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      observer: true,
      observeParents: true,
      slidesPerView: 4,
      spaceBetween: 30,
      speed: 800,
      loop: true,
      pagination: {
        el: '.products-slider__dots',
        clickable: true,
        dynamicBullets: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1370: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
      on: {
        init: function (swiper) {},
      },
    });
  }

  if (document.querySelector('.new-products__slider')) {
    new Swiper('.new-products__slider', {
      modules: [Navigation, Pagination, Autoplay],
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      observer: true,
      observeParents: true,
      slidesPerView: 3,
      spaceBetween: 30,
      speed: 800,
      loop: true,
      pagination: {
        el: '.new-products__dots',
        clickable: true,
        dynamicBullets: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1370: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
      on: {
        init: function (swiper) {},
      },
    });
  }

  if (document.querySelector('.images-product')) {
    const thumbsSwiper = new Swiper('.thumbs-images', {
      modules: [Navigation, Pagination, Autoplay, Thumbs],
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      observer: true,
      observeParents: true,
      slidesPerView: 4,
      spaceBetween: 16,
      speed: 800,
      breakpoints: {
        992: {
          slidesPerView: 3,
        },
        1370: {
          slidesPerView: 4,
          spaceBetween: 16,
        },
      },

      on: {
        init: function (swiper) {},
      },
    });

    new Swiper('.images-product__slider', {
      modules: [Navigation, Pagination, Autoplay, Thumbs],
      thumbs: {
        swiper: thumbsSwiper,
      },
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 30,
      speed: 800,

      on: {
        init: function (swiper) {},
      },
    });
  }
};

initSliders();
// window.addEventListener('load', () => {
//   initSliders();
// });
