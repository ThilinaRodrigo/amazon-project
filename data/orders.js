import { products, loadProdutsFetch} from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';  
import { addToCart } from "./cart.js";

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
    orders.unshift(order)
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('orders',JSON.stringify(orders))
}

function dateInReadMode(day){
    const timestamp = day;
    const parsedDate = dayjs(timestamp);
    return parsedDate.format('MMMM D');
}

function updateTotalCartQuantity(){
    let totalQuantity = localStorage.getItem('totalQuantity');
      document.querySelector('.js-total-quantity').innerHTML = totalQuantity || 0;
    };

function isWeekend(date){
    const day = date.day();
    return day === 0 || day === 6;
}
function deliveryDateFilter(date) {
    let filteredDate = dayjs(date);
    while (isWeekend(filteredDate)) {
        filteredDate = filteredDate.add(1, 'day');
    }
    return filteredDate.format('MMMM D');
}


loadProdutsFetch().then(()=>{
    orderSummaryDisplay();
    updateTotalCartQuantity();
});


export function orderSummaryDisplay(){
  
  const OrderGrid = document.querySelector('.js-order-grid');
  OrderGrid.innerHTML = ''; // Clear previous content

  orders.forEach((product)=>{
    
      const orderContainer = document.createElement('div');
      orderContainer.classList.add('order-container');
    console.log(orders)
      let orderSummary = `
          <div class="order-header">
              <div class="order-header-left-section">
                  <div class="order-date">
                      <div class="order-header-label">Order Placed:</div>
                      <div>${dateInReadMode(product.orderTime)}</div>
                  </div>
                  <div class="order-total">
                      <div class="order-header-label">Total:</div>
                      <div>$${(Math.round(product.totalCostCents)/100).toFixed(2)}</div>
                  </div>
              </div>
              <div class="order-header-right-section">
                  <div class="order-header-label">Order ID:</div>
                  <div>${product.id}</div>
              </div>
          </div>
          <div class="order-details-grid js-order-details-grid">`;

      product.products.forEach((item)=>{
         
        const matchingProduct = products.find(product=>product.id===item.productId);
        
          orderSummary += `
              <div class="product-image-container">
                  <img src="${matchingProduct.image}">
              </div>
              <div class="product-details">
                  <div class="product-name">
                 ${matchingProduct.name}
                  </div>
                  <div class="product-delivery-date">
                      Arriving on: ${deliveryDateFilter(item.estimatedDeliveryTime)}
                  </div>
                  <div class="product-quantity">
                     Quantity: ${item.quantity}
                  </div>
                  <button class="buy-again-button button-primary">
                      <img class="buy-again-icon js-icon" src="images/icons/buy-again.png">
                      <span class="buy-again-message js-buy-again" data-product-id=${item.productId}>Buy it again</span>
                  </button>
              </div>
              <div class="product-actions">
                  <a href="tracking.html">
                      <button class="track-package-button button-secondary js-track-btn"  
                      data-order-id='${product.id}'
                      data-product-id='${item.productId}'>
                          Track package
                      </button>
                  </a>
              </div>`;
      });

     // orderSummary += `</div></div>`;
      orderContainer.innerHTML = orderSummary;
      OrderGrid.appendChild(orderContainer);
  });
        document.querySelectorAll('.js-buy-again').forEach((btn)=>{
            btn.addEventListener('click', ()=>{
                const productId = btn.dataset.productId;
                addToCart(productId);
                updateTotalCartQuantity();

                const icon = btn.parentElement.querySelector('.js-icon');

                icon.style.display = 'none';
                btn.textContent = '✓ Added';

                setTimeout(() => {
                    icon.style.display = 'block';
                    btn.textContent = 'Buy it again';
                }, 1000);
                
            });
        });

        document.querySelectorAll('.js-track-btn').forEach((btn) => {
            btn.addEventListener('click', () => {

                const orderId = btn.dataset.orderId;
                const productId = btn.dataset.productId;
                const newURL = `tracking.html?orderId=${orderId}&productId=${productId}`;
                
                btn.parentNode.href = newURL;
            });
        });
        
        
        
}

