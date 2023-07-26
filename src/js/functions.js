export function isWebp() {
  function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }

  testWebP(function (support) {
    const className = support === true ? 'webp' : 'no-webp';
    document.documentElement.classList.add(className);
  });
}

export function initSpollers() {
  const spollersArray = document.querySelectorAll(`[data-spollers]`);

  const initSpollers = (spollersArray, matchMedia = false) => {
    spollersArray.forEach((spollersBlock) => {
      spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
      if (matchMedia.matches || !matchMedia) {
        spollersBlock.classList.add('_spoller-init');
        initSpollerBody(spollersBlock);
        spollersBlock.addEventListener('click', setSpollerAction);
      } else {
        spollersBlock.classList.remove('_spoller-init');
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
          if (!spollerTitle.classList.contains('_spoller-active')) {
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
        if (oneSpoller && !spollerTitle.classList.contains('_spoller-active')) {
          hideSpollersBody(spollersBlock);
        }
        spollerTitle.classList.toggle('_spoller-active');
        _slideToggle(spollerTitle.nextElementSibling, 500);
      }
      e.preventDefault();
    }
  };

  const hideSpollersBody = (spollersBlock) => {
    const spollerActiveTitle = spollersBlock.querySelector(
      '[data-spoller]._spoller-active'
    );
    if (spollerActiveTitle) {
      spollerActiveTitle.classList.remove('_spoller-active');
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
}

export function initBurgerMenu() {
  const body = document.querySelector('body');
  const burgerMenuIcon = document.querySelector('.icon-menu');
  const menuBody = document.querySelector('.menu__body');

  burgerMenuIcon.addEventListener('click', () => {
    menuBody.classList.toggle('menu-open');
    burgerMenuIcon.classList.toggle('menu-open');
    body.classList.toggle('lock');
    if (document.documentElement.classList.contains('catalog-open')) {
      document.documentElement.classList.remove('catalog-open');
    }

    if (document.documentElement.classList.contains('sub-menu-open')) {
      document.documentElement.classList.remove('sub-menu-open');
    }
  });
}

//  max - Desktop First, min - Mobile First.
export function initDynamicAdapt(type = 'max') {
  const className = '_dynamic_adapt_';
  const attrName = 'data-da';

  const dNodes = getDNodes();

  const dMediaQueries = getDMediaQueries(dNodes);

  dMediaQueries.forEach((dMediaQuery) => {
    const matchMedia = window.matchMedia(dMediaQuery.query);
    const filteredDNodes = dNodes.filter(
      ({ breakpoint }) => breakpoint === dMediaQuery.breakpoint
    );
    const mediaHandler = getMediaHandler(matchMedia, filteredDNodes);
    matchMedia.addEventListener('change', mediaHandler);

    mediaHandler();
  });

  function getDNodes() {
    const result = [];
    const elements = [...document.querySelectorAll(`[${attrName}]`)];

    elements.forEach((element) => {
      const attr = element.getAttribute(attrName);
      const [toSelector, breakpoint, order] = attr
        .split(',')
        .map((val) => val.trim());

      const to = document.querySelector(toSelector);

      if (to) {
        result.push({
          parent: element.parentElement,
          element,
          to,
          breakpoint: breakpoint ?? '767',
          order:
            order !== undefined
              ? isNumber(order)
                ? Number(order)
                : order
              : 'last',
          index: -1,
        });
      }
    });

    return sortDNodes(result);
  }

  function getDMediaQueries(items) {
    const uniqItems = [
      ...new Set(
        items.map(
          ({ breakpoint }) => `(${type}-width: ${breakpoint}px),${breakpoint}`
        )
      ),
    ];

    return uniqItems.map((item) => {
      const [query, breakpoint] = item.split(',');

      return { query, breakpoint };
    });
  }

  function getMediaHandler(matchMedia, items) {
    return function mediaHandler() {
      if (matchMedia.matches) {
        items.forEach((item) => {
          moveTo(item);
        });

        items.reverse();
      } else {
        items.forEach((item) => {
          if (item.element.classList.contains(className)) {
            moveBack(item);
          }
        });

        items.reverse();
      }
    };
  }

  function moveTo(dNode) {
    const { to, element, order } = dNode;
    dNode.index = getIndexInParent(dNode.element, dNode.element.parentElement);
    element.classList.add(className);

    if (order === 'last' || order >= to.children.length) {
      to.append(element);

      return;
    }

    if (order === 'first') {
      to.prepend(element);

      return;
    }

    to.children[order].before(element);
  }

  function moveBack(dNode) {
    const { parent, element, index } = dNode;
    element.classList.remove(className);

    if (index >= 0 && parent.children[index]) {
      parent.children[index].before(element);
    } else {
      parent.append(element);
    }
  }
  function getIndexInParent(element, parent) {
    return [...parent.children].indexOf(element);
  }

  function sortDNodes(items) {
    const isMin = type === 'min' ? 1 : 0;

    return [...items].sort((a, b) => {
      if (a.breakpoint === b.breakpoint) {
        if (a.order === b.order) {
          return 0;
        }

        if (a.order === 'first' || b.order === 'last') {
          return -1 * isMin;
        }

        if (a.order === 'last' || b.order === 'first') {
          return 1 * isMin;
        }

        return 0;
      }

      return (a.breakpoint - b.breakpoint) * isMin;
    });
  }

  function isNumber(value) {
    return !isNaN(value);
  }
}

export function initPopup() {
  const popupLinks = document.querySelectorAll('.popup-link');
  const body = document.querySelector('body');
  const lockPadding = document.querySelectorAll('.lock-padding');
  let unlock = true;

  const timeout = 800;

  if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      popupLink.addEventListener('click', (e) => {
        const popupName = popupLink.getAttribute('href').replace('#', '');
        const currentPopup = document.getElementById(popupName);
        popupOpen(currentPopup);
        e.preventDefault();
      });
    }
  }

  const popupCloseIcon = document.querySelectorAll('.close-popup');
  if (popupCloseIcon.length > 0) {
    for (let i = 0; i < popupCloseIcon.length; i++) {
      const el = popupCloseIcon[i];
      el.addEventListener('click', (e) => {
        popupClose(el.closest('.popup'));
        e.preventDefault();
      });
    }
  }

  function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
      const popupActive = document.querySelector('.popup.open');
      if (popupActive) {
        popupClose(popupActive, false);
      } else {
        bodyLock();
      }
      currentPopup.classList.add('open');
      currentPopup.addEventListener('click', (e) => {
        if (!e.target.closest('.popup__content')) {
          popupClose(e.target.closest('.popup'));
        }
      });
    }
  }

  function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
      popupActive.classList.remove('open');
      if (doUnlock) {
        bodyUnLock();
      }
    }
  }

  function bodyLock() {
    body.classList.add('lock');
    unlock = false;
    setTimeout(() => {
      unlock = true;
    }, timeout);
  }

  function bodyUnLock() {
    setTimeout(() => {
      for (let i = 0; i < lockPadding.length; i++) {
        const el = lockPadding[index];
        el.style.paddingRight = '0px';
      }
      body.style.paddingRight = '0px';
      body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(() => {
      unlock = true;
    }, timeout);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const popupActive = document.querySelector('.popup.open');
      popupClose(popupActive);
    }
  });
}

export function initQuantityForm() {
  if (document.querySelector('.quantity')) {
    const quantityInput = document.getElementById('quantity-input');
    const btnInc = document.querySelector('.quantity__button_plus');
    const btnDec = document.querySelector('.quantity__button_minus');
    let quantityValue = parseInt(quantityInput.value, 10);
    btnInc.addEventListener('click', increment);
    btnDec.addEventListener('click', decrement);
    function increment() {
      quantityValue++;
      quantityInput.value = quantityValue;
    }
    function decrement() {
      if (quantityValue > 0) {
        quantityValue--;
        quantityInput.value = quantityValue;
      }
    }
  }
}
