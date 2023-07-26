import * as usefulFunctions from './functions.js';
import './script.js';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import './sliders.js';
import './rating.js';
import './range.js';
import { Tabs } from './tabs.js';
usefulFunctions.isWebp();

usefulFunctions.initSpollers();

usefulFunctions.initBurgerMenu();

usefulFunctions.initDynamicAdapt();

usefulFunctions.initPopup();

usefulFunctions.initQuantityForm();

tippy('[data-tippy-content]');

new Tabs('.tabs');
