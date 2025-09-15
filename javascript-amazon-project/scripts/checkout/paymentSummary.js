import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import formatCurrency from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary(){

    let productPriceCents = 0;
    let shippingPriceCents = 0;

    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
        productPriceCents += product.priceCents * cartItem.quantity;
        shippingPriceCents += deliveryOption.priceCents;
    });

    const totalBeforeTaxPrice = (formatCurrency(productPriceCents + shippingPriceCents));
    const taxPrice = (((totalBeforeTaxPrice)*(0.1))).toFixed(2);
    const totalAfterTaxPrice = (Number(totalBeforeTaxPrice) + Number(taxPrice)).toFixed(2);
    

    /*console.log(productPriceCents);
    console.log(shippingPriceCents);
    console.log(totalBeforeTaxPrice);
    console.log(taxPrice);
    console.log(totalAfterTaxPrice);*/



    const paymentSummaryHTML = 
    `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cart.length}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${totalBeforeTaxPrice}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${taxPrice}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${totalAfterTaxPrice}</div>
          </div>

          <button class="place-order-button js-place-order button-primary">
            Place your order
          </button>
        </div>
    `
    document.querySelector('.payment-summary').innerHTML = paymentSummaryHTML;

    document.querySelector('.js-place-order').addEventListener('click', async () => {

      try {
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart
          })
        });

        const order = await response.json();
        addOrder(order); // Create order from backend, Add order to the order array, save it in the local storage

      } catch (error) {
        console.log('Unexpected Error, try again later.');
      }

      window.location.href = 'orders.html';

    });

}


