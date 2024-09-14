import {cart, removeFromCart, updateDeliveryOption, addToCart, updateCartQuantity} from '../../data/cart.js'; 
import { products, getProduct } from '../../data/products.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';    //export default dayjs;(only one have each page)
import {deliveryOptions, getDelivetyOption} from '../../data/deliveryOptions.js';
import { randerPaymentSummary } from './paymentSummary.js';

export function renderOrderSimmary(){

          const jsOrderSummary = document.querySelector('.js-order-summary');
          const checkOutTotalQuantity = document.querySelector('.js-item-quantity span');

          document.addEventListener('DOMContentLoaded', updateTotalCartQuantity);

          let cartSummary='';

          if(cart.length == 0){
            cartSummary = `<div>
                            <p> Your cart is empty </p> 
                            <a href="/amazon.html">
                              <button class="view-product-button"> View products </button>
                            </a>
                          </div>`
          }else{
          
          cart.forEach((cartItem)=>{

            const productId = cartItem.productId;

            const matchingProduct= getProduct(productId);

            /* products.forEach((product)=>{
                if(productId === product.id){
                  matchingProduct = product;
                }
            });
 */
            const deliveryOptionId = cartItem.deliveryOptionsId;
            
            let deliveryOption = getDelivetyOption(deliveryOptionId);

            /* deliveryOptions.forEach((option)=>{
                if(option.id === deliveryOptionId){
                  deliveryOption = option;
                }
            }); */

            const today = dayjs();
              let deliveryDate = today.add(deliveryOption.deliveryDays,'days');
              deliveryDate = deliveryDateFilter(deliveryDate);
              const dateString = deliveryDate.format('dddd,MMMM D');

              cartSummary += `<div class="cart-item-container js-cart-container-${matchingProduct.id} js-cart-item-container">
                                <div class="delivery-date">
                                  Delivery date: ${dateString}
                                </div>

                                <div class="cart-item-details-grid">
                                  <img class="product-image"
                                    src=${matchingProduct.image}>

                                  <div class="cart-item-details">
                                    <div class="product-name">
                                    ${matchingProduct.name}
                                    </div>
                                    <div class="product-price">
                                      $${matchingProduct.getPrice()}
                                    </div>
                                    <div class="product-quantity js-product-quantity js-product-quantity-${matchingProduct.id}">
                                      <span>
                                        Quantity: <span class="quantity-label js-quantity-lable-${matchingProduct.id}">${cartItem.quantity}</span>
                                      </span>
                                      <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}" data-product-quantity="${cartItem.quantity}">
                                        Update
                                      </span>
                                    <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                                        Delete
                                      </span>
                                    </div>
                                  </div>

                                  <div class="delivery-options">
                                    <div class="delivery-options-title">
                                      Choose a delivery option:
                                    </div>
                                    ${deliveryOptionsHTML(matchingProduct,cartItem)}
                                  </div>
                                </div>
                              </div>`

          });
          }
          jsOrderSummary.innerHTML = cartSummary;

            //Delivery option 
          function deliveryOptionsHTML(matchingProduct,cartItem){

            let html = '';
            deliveryOptions.forEach((deliveryOption)=>{

              const today = dayjs();
              let deliveryDate = today.add(deliveryOption.deliveryDays,'days');
              deliveryDate = deliveryDateFilter(deliveryDate)
              const dateString = deliveryDate.format('dddd,MMMM D');

              const priceString = deliveryOption.priceCents===0 ? 'FREE' : `$${(deliveryOption.priceCents/100).toFixed(2)} -`;

              const isChecked = deliveryOption.id === cartItem.deliveryOptionsId;

              html += `<div class="delivery-option js-delivery-option" 
                        data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                        <input type="radio" 
                          ${isChecked ? 'checked' : ''}
                          class="delivery-option-input"
                          name="delivery-option-${matchingProduct.id}">
                        <div>
                          <div class="delivery-option-date">
                            ${dateString}
                          </div>
                          <div class="delivery-option-price">
                            ${priceString} Shipping
                          </div>
                        </div>
                  </div>`
            });
            return html;
          };
          //delete product of cart using delete link
          document.querySelectorAll('.js-delete-link').forEach((link)=>{
            link.addEventListener('click',()=>{
                  const productId = link.dataset.productId;
                  removeFromCart(productId);

                  const container = document.querySelector(`.js-cart-container-${productId}`);
                  container.remove();
                  updateTotalCartQuantity();
                  randerPaymentSummary();
                  renderOrderSimmary();
            });
          });
            //update the totatlQuantity top of the page
          function updateTotalCartQuantity(){
                let totalQuantity = localStorage.getItem('totalQuantity') || 0;
                  checkOutTotalQuantity.innerHTML = totalQuantity;
                };


          document.querySelectorAll('.js-delivery-option').forEach((element)=>{
              element.addEventListener('click',()=>{
                const {productId,deliveryOptionId} = element.dataset
                updateDeliveryOption(productId,deliveryOptionId);
                renderOrderSimmary();
                randerPaymentSummary();
              });
          });

          //update quantity using input box
          let isClicked = false;
          document.querySelectorAll('.js-update-link').forEach((link)=>{
                link.addEventListener('click',()=>{
                    
                    const productId = link.dataset.productId;
                    let productQuantity = link.dataset.productQuantity;
                    let quantityLable = document.querySelector(`.js-quantity-lable-${productId}`);
                    let inputQuantity = productQuantity;

                    if(!isClicked){
                       quantityLable.innerHTML = `<input type='number' value='${productQuantity}' class='js-input js-input-quantity' min='1'>`;                     
                       link.textContent = 'save';
                       isClicked = true;
                          
                    }else{
                      inputQuantity = (document.querySelector('.js-input-quantity').value)-productQuantity;
                      quantityLable.innerHTML = `<span>${inputQuantity} </span>`;
                      link.textContent = 'Update'; 
                      
                      addToCart(productId,null,inputQuantity);

                      updateCartQuantity();
                      updateTotalCartQuantity();
                      renderOrderSimmary();
                      randerPaymentSummary();
    
                      isClicked = false;
                    }
                    
                });
          });
          updateTotalCartQuantity();
      
  }
 // to skip sunday & saturday
function isWeekend(date){
  const day = date.day();
  return day === 0 || day === 6;
}
function deliveryDateFilter(date) {
  let filteredDate = dayjs(date);
  while (isWeekend(filteredDate)) {
      filteredDate = filteredDate.add(1, 'day');
  }
  return filteredDate;
}
