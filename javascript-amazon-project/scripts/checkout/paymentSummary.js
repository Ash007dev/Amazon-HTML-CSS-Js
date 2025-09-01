import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import formatCurrency from "../utils/money.js";

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

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>
    `
    document.querySelector('.payment-summary').innerHTML = paymentSummaryHTML;
}