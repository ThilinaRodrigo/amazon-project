import { loadProdutsFetch, getProduct } from "./products.js";
import { orders } from "./orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


const url = new URL(window.location.href);
        const orderId = url.searchParams.get('orderId');
        const productId = url.searchParams.get('productId');

loadProdutsFetch().then(()=>{
  renderTrackigSummry();
})
let summary= '';

function renderTrackigSummry(){
        
        const matchingProduct = getProduct(productId);
        const matchingOrder = getOrder(orderId)
        const matchingOrderProduct = getOrderProduct(productId,orderId)

        const orderTime = dayjs(matchingOrder.orderTime);
        const estimatedDeliveryTime = dayjs(matchingOrderProduct.estimatedDeliveryTime);
        const currentTime = dayjs();
      
        const trackingRange = (currentTime-orderTime) / (estimatedDeliveryTime-orderTime);

          summary = `<div class="order-tracking">
                            <a class="back-to-orders-link link-primary" href="orders.html">
                              View all orders
                            </a>

                            <div class="delivery-date">
                                Arriving on ${dateInReadMode(matchingOrderProduct.estimatedDeliveryTime)} 
                            </div>

                            <div class="product-info">
                              ${matchingProduct.name}
                            </div>

                            <div class="product-info">
                              Quantity: ${matchingOrderProduct.quantity}
                            </div>

                            <img class="product-image" src="${matchingProduct.image}">

                            <div class="progress-labels-container">
                              <div class="progress-label js-preparing">
                                Preparing
                              </div>
                              <div class="progress-label js-shipped">
                                Shipped
                              </div>
                              <div class="progress-label js-delivered">
                                Delivered
                              </div>
                            </div>

                            <div class="progress-bar-container">
                              <div class="progress-bar js-progress-bar"></div>
                            </div>
                          </div>`

        document.querySelector('.js-main').innerHTML = summary;
        document.querySelector('.js-progress-bar').style.width = `${Math.round(trackingRange*100)}%`;
        const preparing = document.querySelector('.js-preparing');
        const shipped = document.querySelector('.js-shipped');
        const delivered = document.querySelector('.js-delivered');

        deliverySate(Math.round(trackingRange*100),preparing,shipped,delivered);
}

function getOrder(orderId) {
  return orders.find((order) => order.id === orderId);
}
function getOrderProduct(productId,orderId){
  const order = getOrder(orderId);
  return order.products.find((product)=>product.productId == productId);
}

function dateInReadMode(day){
  //const timestamp = day;
  const parsedDate = dayjs(day);
  return parsedDate.format('dddd, MMMM D');
}

function deliverySate(trackingRange,preparing,shipped,delivered){
       if(trackingRange >= 0 && trackingRange < 50){
            preparing.classList.add('current-status');
       }else if(trackingRange >= 50 && trackingRange < 100){
            preparing.classList.remove('current-status');
            shipped.classList.add('current-status');
       }else{
            shipped.classList.remove('current-status');
            delivered.classList.add('current-status');
       }
}