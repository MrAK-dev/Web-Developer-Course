import * as usefulFunctions from './files/functions.js';
import { dynamicAdaptive } from './libs/dynamic-adaptive.js';
import * as scroll from './files/scroll/scroll.js';
import * as mouseParallax from './libs/parallax-mouse.js';
import * as parallax from './libs/parallax.js';

usefulFunctions.isWebp();
usefulFunctions.menuInit();
dynamicAdaptive.init();
scroll.headerScroll();
mouseParallax.init();
parallax.init();
usefulFunctions.spollers();
