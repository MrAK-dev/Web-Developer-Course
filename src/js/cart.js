export const addToCart = (productButton, productId) => {
  if (!productButton.classList.contains('_hold')) {
    productButton.classList.add('_hold');
    productButton.classList.add('_fly');

    const cart = document.querySelector('.cart-header__icon');
    const product = document.querySelector(`[data-pid="${productId}"]`);
    const productImage = product.querySelector('.item-product__image');
    const productImageFly = productImage.cloneNode(true);

    const productImageFlyWidth = productImage.offsetWidth;
    const productImageFlyHeight = productImage.offsetHeight;
    const productImageFlyTop = productImage.getBoundingClientRect().top;
    const productImageFlyLeft = productImage.getBoundingClientRect().left;

    productImageFly.setAttribute('class', '_flyImage');
    productImageFly.style.cssText = `
      left: ${productImageFlyLeft}px;
      top: ${productImageFlyTop}px;
      width: ${productImageFlyWidth}px;
      height: ${productImageFlyHeight}px;
    `;

    document.body.append(productImageFly);
    const cartFlyLeft = cart.getBoundingClientRect().left;
    const cartFlyTop = cart.getBoundingClientRect().top;

    productImageFly.style.cssText = `
    left: ${cartFlyLeft}px;
    top: ${cartFlyTop}px;
    width: 0px;
    height: 0px;
    opacity: 0;
  `;

    productImageFly.addEventListener('transitionend', () => {
      if (productButton.classList.contains('_fly')) {
        productImageFly.remove();
        updateCart(productButton, productId);
        productButton.classList.remove('_fly');
      }
    });
  }
};

export function updateCart(productButton, productId, productAdd = true) {
  const cart = document.querySelector('.cart-header');
  const cartIcon = document.querySelector('.cart-header__icon');
  const cartQuantity = cartIcon.querySelector('span');
  const cartProduct = document.querySelector(`[data-cart-pid='${productId}']`);
  const cartList = document.querySelector('.cart-list');

  if (productAdd) {
    if (cartQuantity) {
      cartQuantity.innerHTML = ++cartQuantity.innerHTML;
    } else {
      cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`);
    }

    if (!cartProduct) {
      const product = document.querySelector(`[data-pid="${productId}"]`);
      const cartProductImage = product.querySelector(
        '.item-product__image'
      ).innerHTML;
      const cartProductTitle = product.querySelector(
        '.item-product__title'
      ).innerHTML;
      const cartProductContent = `
        <a class="cart-list__image" href="">${cartProductImage}</a>
        <div class="cart-list__body">
          <a class="cart-list__title" href="">${cartProductTitle}</a>
          <div class="cart-list__quantity">Quantity <span>1</span></div>
          <a class="cart-list__delete" href="">Delete</a>
        </div>
      `;
      cartList.insertAdjacentHTML(
        'beforeend',
        `<li class="cart-list__item" data-cart-pid="${productId}">${cartProductContent}</li>`
      );
    } else {
      const cartProductQuantity = cartProduct.querySelector(
        '.cart-list__quantity span'
      );
      cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
    }

    productButton.classList.remove('_hold');
  } else {
    const cartProductQuantity = cartProduct.querySelector(
      '.cart-list__quantity span'
    );
    cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
    if (!parseInt(cartProductQuantity.innerHTML)) {
      cartProduct.remove();
    }

    const cartQuantityValue = --cartQuantity.innerHTML;

    if (cartQuantityValue) {
      cartQuantity.innerHTML = cartQuantityValue;
    } else {
      cartQuantity.remove();
      cart.classList.remove('_active');
    }
  }
}
