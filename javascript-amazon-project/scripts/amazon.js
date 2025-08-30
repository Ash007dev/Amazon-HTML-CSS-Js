import { cart, addToCart, calculateCartQty } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
let productsHTML = '';

// fyi, import * as <name> from <module_location>, then can use <name>.func(); -- 



products.forEach((product) => {
  productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-name="${product.name}" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `;

})

document.querySelector('.products-grid').innerHTML = productsHTML;

//console.log(productsHTML);


let cartQuantity = calculateCartQty();
document.querySelector('.cart-quantity').innerHTML = cartQuantity;


document.querySelectorAll('.js-add-to-cart').forEach((button) => {

  let addedMessageTimeoutId;
  button.addEventListener('click', () => {
    const productId = button.dataset.productId; // in dataset, all the data-"" attributes are taken, and converted from 'kebab-case' to 'camelCase'

    let addedToCart = document.querySelector(`.js-added-to-cart-${productId}`);
    addedToCart.classList.add("added-to-cart-visible");

    clearTimeout(addedMessageTimeoutId); // Basically reload the display time, each time user clicks the button
    addedMessageTimeoutId = setTimeout(() => {
      addedToCart.classList.remove('added-to-cart-visible');  
    }, 2000);

    /*
    ALTERNATE WAY FOR ADDED TO CART DISPLAY MSG
    const addedToCart = document.querySelector(`.js-added-to-cart-${productId}`);
    addedToCart.style.opacity = 1;
    setTimeout(() => {
      addedToCart.style.opacity = 0;
    }, 2000);
    */
    
    addToCart(productId); // Adds products to the cart
    cartQuantity = calculateCartQty(); // Updates the cart quantity
    document.querySelector('.js-cart-qty').innerHTML = cartQuantity;
  });
});


    /*
      ALTERNATIVE CODE FOR CHECKING THE EXISITING cartITEM
    const productId = button.dataset.productId;

    const productIndex = cart.findIndex((cartItem) => {
      return cartItem.productId === productId;
    })

    if (productIndex === -1){
      cart.push(
        {
          productId: productId,
          quantity: 1
        });
    }
    else{
      cart[productIndex].quantity += 1;
    }
    console.log(cart)*/
