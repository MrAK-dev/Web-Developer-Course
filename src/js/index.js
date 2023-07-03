import * as gulpFunctions from './gulpFunctions.js';
import { isMobile } from './isMobile.js';
import { getProducts } from './getProducts.js';
import { addToCart, updateCart } from './cart.js';
import Swiper, { Navigation, Pagination, Parallax } from 'swiper';
import 'swiper/css';
gulpFunctions.isWebp();

window.onload = () => {
  const documentActions = (e) => {
    const targetElement = e.target;
    if (window.innerWidth > 768 && isMobile.any()) {
      if (targetElement.classList.contains('menu__arrow')) {
        targetElement.closest('.menu__item').classList.toggle('_hover');
      }
      if (
        !targetElement.closest('.menu__item') &&
        document.querySelectorAll('.menu__item._hover').length > 0
      ) {
        document.querySelectorAll('.menu__item._hover').forEach((item) => {
          item.classList.remove('_hover');
        });
      }
    }
    if (targetElement.classList.contains('search-form__icon')) {
      document.querySelector('.search-form').classList.toggle('_active');
    } else if (
      !targetElement.closest('.search-form') &&
      document.querySelector('.search-form._active')
    ) {
      // document.querySelector('.search-form').classList.remove('_active');
    }
    if (targetElement.classList.contains('products__more')) {
      getProducts(targetElement);
      e.preventDefault();
    }
    if (targetElement.classList.contains('actions-product__button')) {
      const productId = targetElement.closest('.item-product').dataset.pid;
      addToCart(targetElement, productId);
      e.preventDefault();
    }

    if (
      targetElement.classList.contains('cart-header__icon') ||
      targetElement.closest('.cart-header__icon')
    ) {
      if (document.querySelector('.cart-list').children.length > 0) {
        document.querySelector('.cart-header').classList.toggle('_active');
      }
      e.preventDefault();
    } else if (
      !targetElement.closest('.cart-header') &&
      !targetElement.classList.contains('actions-product__button')
    ) {
      document.querySelector('.cart-header').classList.remove('_active');
    }

    if (targetElement.classList.contains('cart-list__delete')) {
      const productId =
        targetElement.closest('.cart-list__item').dataset.cartPid;
      updateCart(targetElement, productId, false);
      e.preventDefault();
    }
  };

  document.addEventListener('click', documentActions);

  const headerElement = document.querySelector('.header');

  const callback = (entries, observer) => {
    if (entries[0].isIntersecting) {
      headerElement.classList.remove('_scroll');
    } else {
      headerElement.classList.add('_scroll');
    }
  };

  const headerObserver = new IntersectionObserver(callback);

  headerObserver.observe(headerElement);
};

const spollersArray = document.querySelectorAll(`[data-spollers]`);

const initSpollers = (spollersArray, matchMedia = false) => {
  spollersArray.forEach((spollersBlock) => {
    spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
    if (matchMedia.matches || !matchMedia) {
      spollersBlock.classList.add('_init');
      initSpollerBody(spollersBlock);
      spollersBlock.addEventListener('click', setSpollerAction);
    } else {
      spollersBlock.classList.remove('_init');
      initSpollerBody(spollersBlock, false);
      spollersBlock.removeEventListener('click', setSpollerAction);
    }
  });
};

const initSpollerBody = (spollersBlock, hideSpollerBody = true) => {
  const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
  if (spollerTitles.length > 0) {
    spollerTitles.forEach((spollerTitle) => {
      if (hideSpollerBody) {
        spollerTitle.removeAttribute('tabindex');
        if (!spollerTitle.classList.contains('_active')) {
          spollerTitle.nextElementSibling.hidden = true;
        }
      } else {
        spollerTitle.setAttribute('tabindex', '-1');
        spollerTitle.nextElementSibling.hidden = false;
      }
    });
  }
};

const setSpollerAction = (e) => {
  const el = e.target;
  if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
    const spollerTitle = el.hasAttribute('data-spoller')
      ? el
      : el.closest('[data-spoller]');
    const spollersBlock = spollerTitle.closest('[data-spollers]');
    const oneSpoller = spollersBlock.hasAttribute('data-one-spoller')
      ? true
      : false;
    if (!spollersBlock.querySelectorAll('._slide').length) {
      if (oneSpoller && !spollerTitle.classList.contains('_active')) {
        hideSpollersBody(spollersBlock);
      }
      spollerTitle.classList.toggle('_active');
      _slideToggle(spollerTitle.nextElementSibling, 500);
    }
    e.preventDefault();
  }
};

const hideSpollersBody = (spollersBlock) => {
  const spollerActiveTitle = spollersBlock.querySelector(
    '[data-spoller]._active'
  );
  if (spollerActiveTitle) {
    spollerActiveTitle.classList.remove('_active');
    _slideUp(spollerActiveTitle.nextElementSibling, 500);
  }
};

const _slideUp = (target, duration = 500) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = `${duration}ms`;
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = true;
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
    }, duration);
  }
};

const _slideDown = (target, duration = 500) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    if (target.hidden) {
      target.hidden = false;
    }
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = `${duration}ms`;
    target.style.height = `${height}px`;
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
    }, duration);
  }
};

const _slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};

if (spollersArray.length > 0) {
  const spollersRegular = Array.from(spollersArray).filter((item) => {
    return !item.dataset.spollers.split(',')[0];
  });
  if (spollersRegular.length > 0) {
    initSpollers(spollersRegular);
  }

  const spollersMedia = Array.from(spollersArray).filter((item) => {
    return item.dataset.spollers.split(',')[0];
  });

  if (spollersMedia.length > 0) {
    const breakpointsArray = [];
    spollersMedia.forEach((item) => {
      const params = item.dataset.spollers;
      const breakpoint = {};
      const paramsArray = params.split(',');
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    });

    let mediaQueries = breakpointsArray.map((item) => {
      return `(${item.type}-width: ${item.value}px),${item.value},${item.type}`;
    });
    mediaQueries = mediaQueries.filter((item, index, self) => {
      return self.indexOf(item) === index;
    });

    mediaQueries.forEach((breakpoint) => {
      const paramsArray = breakpoint.split(',');
      const mediaBreakpoint = paramsArray[1];
      const mediaType = paramsArray[2];
      const matchMedia = window.matchMedia(paramsArray[0]);
      const spollersArray = breakpointsArray.filter((item) => {
        if (item.value === mediaBreakpoint && item.type === mediaType) {
          return true;
        }
      });
      matchMedia.addEventListener('change', () => {
        initSpollers(spollersArray, matchMedia);
      });
      initSpollers(spollersArray, matchMedia);
    });
  }
}

//  Burger
const body = document.querySelector('body');
const burgerMenuIcon = document.querySelector('.icon-menu');
const menuBody = document.querySelector('.menu__body');

burgerMenuIcon.addEventListener('click', () => {
  menuBody.classList.toggle('active');
  burgerMenuIcon.classList.toggle('active');
  body.classList.toggle('lock');
});

//  Build Slider
const sliders = document.querySelectorAll('._swiper');
if (sliders) {
  for (let i = 0; i < sliders.length; i++) {
    let slider = sliders[i];
    if (!slider.classList.contains('swiper-bild')) {
      let slider_items = slider.children;
      if (slider_items) {
        for (let index = 0; index < slider_items.length; index++) {
          let el = slider_items[index];
          el.classList.add('swiper-slide');
        }
      }
      let slider_content = slider.innerHTML;
      let slider_wrapper = document.createElement('div');
      slider_wrapper.classList.add('swiper-wrapper');
      slider_wrapper.innerHTML = slider_content;
      slider.innerHTML = '';
      slider.appendChild(slider_wrapper);
      slider.classList.add('swiper-bild');

      if (slider.classList.contains('_swiper_scroll')) {
        let sliderScroll = document.createElement('div');
        sliderScroll.classList.add('swiper-scrollbar');
        slider.appendChild(sliderScroll);
      }
    }
    if (slider.classList.contains('_gallery')) {
      // slider.data('lightGallery').destroy(true);
    }
  }
  sliders_bild_callback();
}

function sliders_bild_callback(params) {}

const sliderScrollItems = document.querySelectorAll('._swiper_scroll');
if (sliderScrollItems.length > 0) {
  for (let i = 0; i < sliderScrollItems.length; i++) {
    const sliderScrollItem = sliderScrollItems[i];
    const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
    const sliderScroll = new Swiper(sliderScrollItem, {
      observer: true,
      ovserveParents: true,
      direction: 'vertical',
      slidesPerView: 'auto',
      freeMode: true,
      scrollbar: {
        el: sliderScrollBar,
        draggable: true,
        snapOnRelease: false,
      },
      mousewheel: {
        releaseOnEdges: true,
      },
    });
    sliderScroll.scrollbar.updateSize();
  }
}

if (document.querySelector('.slider-main__body')) {
  new Swiper('.slider-main__body', {
    observer: true,
    observeParents: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    loop: true,
    spaceBetween: 32,
    speed: 800,
    parallax: true,
    modules: [Navigation, Pagination, Parallax],
    pagination: {
      el: '.controls-slider-main__dots',
      clickable: true,
    },
    navigation: {
      nextEl: '.slider-main .slider-arrow_next',
      prevEl: '.slider-main .slider-arrow_prev',
    },
  });
}

if (document.querySelector('.slider-rooms__body')) {
  new Swiper('.slider-rooms__body', {
    observer: true,
    observeParents: true,
    slidesPerView: 'auto',
    spaceBetween: 24,
    speed: 800,
    loop: true,
    watchOverflow: true,
    loopAdditionalSlides: 5,
    preloadImages: false,
    parallax: true,
    modules: [Navigation, Pagination, Parallax],
    pagination: {
      el: '.slider-rooms__dots',
      clickable: true,
    },
    navigation: {
      nextEl: '.slider-rooms .slider-arrow_next',
      prevEl: '.slider-rooms .slider-arrow_prev',
    },
  });
}

if (document.querySelector('.slider-tips__body')) {
  new Swiper('.slider-tips__body', {
    observer: true,
    observeParents: true,
    slidesPerView: 3,
    spaceBetween: 32,
    speed: 800,
    loop: true,
    watchOverflow: true,
    modules: [Navigation, Pagination],
    pagination: {
      el: '.slider-tips__dots',
      clickable: true,
    },
    navigation: {
      nextEl: '.slider-tips .slider-arrow_next',
      prevEl: '.slider-tips .slider-arrow_prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1.1,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 32,
      },
    },
  });
}

//  Furniture Gallery
const furniture = document.querySelector('.furniture__body');
if (furniture && !isMobile.any()) {
  const furnitureItems = document.querySelector('.furniture__items');
  const furnitureColumn = document.querySelectorAll('.furniture__column');

  const speed = furniture.dataset.speed;
  let positionX = 0;
  let coordXpercent = 0;

  function setMouseGalleryStyle() {
    let furnitureItemsWidth = 0;
    furnitureColumn.forEach((element) => {
      furnitureItemsWidth += element.offsetWidth;
    });

    const furnitureDifferent = furnitureItemsWidth - furniture.offsetWidth;
    const distX = Math.floor(coordXpercent - positionX);

    positionX = positionX + distX * parseFloat(speed, 10);
    let position = (furnitureDifferent / 200) * positionX;

    furnitureItems.style.cssText = `transform: translate3d(${-position}px,0,0);`;

    if (Math.abs(distX) > 0) {
      requestAnimationFrame(setMouseGalleryStyle);
    } else {
      furniture.classList.remove('_init');
    }
  }
  furniture.addEventListener('mousemove', (e) => {
    const furnitureWidth = furniture.offsetWidth;

    const coordX = e.pageX - furnitureWidth / 2;

    coordXpercent = (coordX / furnitureWidth) * 200;

    if (!furniture.classList.contains('_init')) {
      requestAnimationFrame(setMouseGalleryStyle);
      furniture.classList.add('_init');
    }
  });
}
