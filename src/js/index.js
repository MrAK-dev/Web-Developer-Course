import '../scss/style.scss';
import * as usefulFunctions from './files/functions.js';

/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
/* (i) необходимо для корректного отображения webp из css  */
usefulFunctions.isWebp();
/* Добавление класса touch для HTML если браузер мобильный */
// usefulFunctions.addTouchClass();
/* Добавление loaded для HTML после полной загрузки страницы */
// usefulFunctions.addLoadedClass();
/* Модуль для работы с меню (Бургер) */
// usefulFunctions.menuInit();
/* Учет плавающей панели на мобильных устройствах при 100vh */
// usefulFunctions.fullVHfix();

/*
Модуль работы со спойлерами
Сниппет (HTML): spollers
*/
// usefulFunctions.spollers();

/*
Модуль работы с табами
Сниппет (HTML): tabs
*/
// usefulFunctions.tabs();

/*
Модуль "показать еще"
Сниппет (HTML): showmore
*/
// usefulFunctions.showMore();

/*
Попапы
Сниппет (HTML): pl
*/
// import './libs/popup.js'

/*
Модуль параллакса мышью
*/
// import './libs/parallax-mouse.js'

// ========================================================================================================================================================================================================================================================
// Работа с формами ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
import * as usefulForms from './files/forms/forms.js';

/* Работа с полями формы */
// usefulForms.formFieldsInit({ viewPass: false });

/* Oтправка формы */
//  usefulForms.formSubmit();

/* Модуль формы "колличество" */
// usefulForms.formQuantity();

/* Модуль звездного рейтинга */
//  usefulForms.formRating();

/* Модуль работы с select. */
// import './libs/select.js'

/* (В работе) Модуль работы с масками.*/
/*
Подключение и настройка выполняется в файле js/files/forms/inputmask.js
*/
// import "./files/forms/inputmask.js";

/* Модуль работы с ползунком */
/*
Подключение и настройка выполняется в файле js/files/forms/range.js
Документация плагина: https://refreshless.com/nouislider/
Сниппет (HTML): range
*/
// import "./files/forms/range.js";

/* Модуль работы с подсказками (tippy) */
/*
Подключение плагина Tippy.js и настройка выполняется в файле js/files/tippy.js
Документация плагина: https://atomiks.github.io/tippyjs/
Сниппет (HTML): tip (добавляет атрибут с подсказкой для html тега)
*/
// import "./files/tippy.js";

// ========================================================================================================================================================================================================================================================
// Работа со слайдером (Swiper) ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
/*
Настройка подключения плагина слайдера Swiper и новых слайдеров выполняется в файле js/files/sliders.js
Документация плагина: https://swiperjs.com/
Сниппет(HTML): swiper
*/
// import "./files/sliders.js";

// ========================================================================================================================================================================================================================================================
// Модули работы с прокруткой страницы ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================

/*
Изменение дизайна скроллбара
Документация по работе в шаблоне: В HTML добавляем к блоку атрибут data-simplebar
Документация плагина: https://github.com/Grsmto/simplebar/tree/master/packages/simplebar
Сниппет(HTML): 
*/
// import './files/scroll/simplebar.js';

// Ленивая (отложенная) загрузка картинок
// Документация плагина: https://github.com/verlok/vanilla-lazyload
// import './files/scroll/lazyload.js';

// Наблюдатель за объектами c атрибутом data-watch
// import './libs/watcher.js'

// Функции работы скроллом
import * as usefulScroll from './files/scroll/scroll.js';

// Плавная навигация по странице
// usefulScroll.pageNavigation();

// Функционал добавления классов к хедеру при прокрутке
// usefulScroll.headerScroll();

// Функционал липкого блока
//usefulScroll.stickyBlock();

// ========================================================================================================================================================================================================================================================
// Галерея ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
/*
Документация плагина: https://www.lightgalleryjs.com/docs/
*/
// import "./files/gallery.js";

// ========================================================================================================================================================================================================================================================
// Прочие плагины ============================================================================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================

/* Динамический адаптив */
// import "./libs/dynamic_adapt.js";

/* Форматирование чисел */
// import './libs/wNumb.min.js';

// ========================================================================================================================================================================================================================================================
// Прочее ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
/* Подключаем файлы со своим кодом */
import './files/script.js';
//============================================================================================================================================================================================================================================
