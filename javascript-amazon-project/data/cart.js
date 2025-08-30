export const cart = [];


export function addToCart(productId){

    let matchingCartItem;
    cart.forEach((cartItem) => {
      if(productId === cartItem.productId){
        matchingCartItem = cartItem;
      }
    });
    const dropDownQty = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    if(matchingCartItem){
      matchingCartItem.quantity += dropDownQty;
    }
    else{
      cart.push({
        productId: productId,
        quantity: dropDownQty
      });
    }
}