import * as noUiSlider from 'nouislider';
export function initRange() {
  const rangeItems = document.querySelectorAll('[data-range]');
  if (rangeItems.length) {
    rangeItems.forEach((rangeItem) => {
      const fromValue = rangeItem.querySelector('[data-range-from]');
      const toValue = rangeItem.querySelector('[data-range-to]');
      const item = rangeItem.querySelector('[data-range-item]');
      noUiSlider.create(item, {
        start: [parseFloat(fromValue.value, 10), parseFloat(toValue.value)], //[0, 200000]
        connect: true,
        tooltips: [true, true],
        range: {
          min: [parseFloat(fromValue.dataset.rangeFrom, 10)],
          max: [parseFloat(toValue.dataset.rangeTo, 10)],
        },
      });
      item.noUiSlider.on('update', (values, handle) => {
        fromValue.value = values[0];
        toValue.value = values[1];
      });
    });
  }
}
initRange();
