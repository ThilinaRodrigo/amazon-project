import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDelivetyOption } from "../../data/deliveryOptions.js";
import { addOrder } from "../../data/orders.js";

export function randerPaymentSummary(){

  let productPriceCents = 0;
  let shipingPriceCents = 0;
  let totalQuantity = 0;

  cart.forEach((cartItem)=>{
     const deliveryOption = getDelivetyOption(cartItem.deliveryOptionsId);
     const product = getProduct(cartItem.productId);
    
     totalQuantity += cartItem.quantity;
     productPriceCents += (product.priceCents * cartItem.quantity) ;
     shipingPriceCents += deliveryOption.priceCents;

  });
  const totalBeforeTaxCents = productPriceCents + shipingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML=`
                          <div class="payment-summary-title">
                            Order Summary
                          </div>

                          <div class="payment-summary-row">
                            <div>Items (${totalQuantity}):</div>
                            <div class="payment-summary-money">$${(Math.round(productPriceCents)/100).toFixed(2)}</div>
                          </div>

                          <div class="payment-summary-row">
                            <div>Shipping &amp; handling:</div>
                            <div class="payment-summary-money">$${(Math.round(shipingPriceCents)/100).toFixed(2)}</div>
                          </div>

                          <div class="payment-summary-row subtotal-row">
                            <div>Total before tax:</div>
                            <div class="payment-summary-money">$${(Math.round(totalBeforeTaxCents)/100).toFixed(2)}</div>
                          </div>

                          <div class="payment-summary-row">
                            <div>Estimated tax (10%):</div>
                            <div class="payment-summary-money">$${(Math.round(taxCents)/100).toFixed(2)}</div>
                          </div>

                          <div class="payment-summary-row total-row">
                            <div>Order total:</div>
                            <div class="payment-summary-money">$${(Math.round(totalCents)/100).toFixed(2)}</div>
                          </div>

                          <button class="place-order-button button-primary js-place-order">
                            Place your order
                          </button>
                          
  `;

document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

const placeOrderBtn = document.querySelector('.js-place-order');

if( cart.length == 0 ){
  placeOrderBtn.disabled = true;
  placeOrderBtn.classList.add('place-order-button-disabled');
}

placeOrderBtn.addEventListener('click',async()=>{
  try{
    const response = await fetch('https://supersimplebackend.dev/orders',{
      method: 'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify({
        cart:cart
      })
    })

    const order = await response.json()
    addOrder(order);

  }catch (error){
      console.log('Unexpected error.Try again later');
  }
    localStorage.removeItem('cart');
    localStorage.removeItem('totalQuantity');
    window.location.href = 'orders.html'
});

}