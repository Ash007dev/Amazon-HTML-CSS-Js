import { cart, removeFromCart, calculateCartQty, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";


hello();

const today = dayjs();
const freeDeliveryDate = today.add(9, 'days');
const threeDayDeliveryDate = today.add(3, 'days');
const oneDayDeliveryDate = today.add(1, 'day');

function formatDate(date){
    return date.format('dddd, MMMM DD');
}


let cartSummaryHTML = "";
let cartQty = calculateCartQty();
updateCartQuantity();


cart.forEach((cartItem) => {

    const productId = cartItem.productId;
    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        };
    });

    console.log(matchingProduct);

    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date js-delivery-date-${matchingProduct.id}" data-product-id=${matchingProduct.id}>
            
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id=${matchingProduct.id}>
                Update
                </span>
                <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                <span class="save-quantity-link link-primary js-save-link" data-product-id=${matchingProduct.id}>Save</span>
                <span class="delete-quantity-link link-primary" data-product-id=${matchingProduct.id}>
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            <div class="delivery-option">
                <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date js-option-1">
                    
                </div>
                <div class="delivery-option-price">
                    FREE Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date js-option-2">
                    
                </div>
                <div class="delivery-option-price">
                    $4.99 - Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date js-option-3">
                    
                </div>
                <div class="delivery-option-price">
                    $9.99 - Shipping
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    `;
});


document.querySelector(".order-summary").innerHTML = cartSummaryHTML;

const deliveryOptionFree = document.querySelectorAll('.js-option-1');
const deliveryOptionThreeDays = document.querySelectorAll('.js-option-2');
const deliveryOptionOneDay = document.querySelectorAll('.js-option-3');
const deliveryDate = document.querySelectorAll('.delivery-date');

deliveryDate.forEach((date) => {
    const productId = date.dataset.productId;
    const productDeliveryDate = document.querySelector(`.js-delivery-date-${productId}`);
    productDeliveryDate.innerHTML = `Delivery Date: ${formatDate(freeDeliveryDate)}`;
});

deliveryOptionFree.forEach((opt1) => {
    opt1.innerHTML = formatDate(freeDeliveryDate);
});

deliveryOptionThreeDays.forEach((opt2) => {
    opt2.innerHTML = formatDate(threeDayDeliveryDate);
});

deliveryOptionOneDay.forEach((opt3) => {
    opt3.innerHTML = formatDate(oneDayDeliveryDate);
});


document.querySelectorAll('.delete-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);
        updateCartQuantity();
        const container = document.querySelector(`.js-cart-item-container-${productId}`)
        container.remove();

        console.log(container);
        console.log(cart);
    });
});

function updateCartQuantity(){
    cartQty = calculateCartQty();
    document.querySelector('.js-checkout-qty').innerHTML = cartQty;
};

document.querySelectorAll('.js-update-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');
    });
  });

document.querySelectorAll('.js-save-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;

            const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
            const newQuantity = Number(quantityInput.value);

            if (newQuantity < 0 || newQuantity >= 1000){
                alert("-Quantity must be greater than 0 and less than 1000-");
                return;
            };

            updateQuantity(productId, newQuantity);

            const container = document.querySelector( 
            `.js-cart-item-container-${productId}`
            );
            container.classList.remove('is-editing-quantity');

            const quantityLabel = document.querySelector(
                `.js-quantity-label-${productId}`
            );
            quantityLabel.innerHTML = newQuantity;

            updateCartQuantity();
        });
    });

//console.log(cartSummaryHTML);
console.log(cart);
