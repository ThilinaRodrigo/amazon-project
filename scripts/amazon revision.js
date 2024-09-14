const productsGrid = document.querySelector('.js-products-grid');
let jsCartQuantity = document.querySelector('.js-cart-quantity');

products.forEach((product)=>{
        productsGrid.innerHTML += `<div class="product-container">
                                    <div class="product-image-container">
                                      <img class="product-image"
                                        src=${product.image}>
                                    </div>

                                    <div class="product-name limit-text-to-2-lines">
                                      ${product.name}
                                    </div>

                                    <div class="product-rating-container">
                                      <img class="product-rating-stars"
                                        src="images/ratings/rating-${product.rating.stars*10}.png">
                                      <div class="product-rating-count link-primary">
                                        ${product.rating.count}
                                      </div>
                                    </div>

                                    <div class="product-price">
                                      $${(product.priceCents/100).toFixed(2)}
                                    </div>

                                    <div class="product-quantity-container">
                                      <select class="js-product-quantity-select">
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

                                    <div class="added-to-cart">
                                      <img src="images/icons/checkmark.png">
                                      Added
                                    </div>

                                    <button class="add-to-cart-button button-primary js-added-to-cart" data-product-id="${product.id}">
                                      Add to Cart
                                    </button>
                                  </div>`;
});

document.querySelectorAll('.js-added-to-cart').forEach((addToCartBtn)=>{
      addToCartBtn.addEventListener('click',(event)=>{
        
                //console.log(event);
              // Find the closest product container to the clicked button
              const productContainer = event.target.closest('.product-container');
              //Using closest: This ensures that the code accurately targets the nearest .product-container 
              // Get the select element within that container
              const selectQuantity = productContainer.querySelector('.js-product-quantity-select');

              const productId = addToCartBtn.dataset.productId; //product-id => productId
              let matchingItem;

              cart.forEach((item)=>{
                if(productId === item.productId){
                  matchingItem = item;
                }
              });

              if(matchingItem){
                    matchingItem.quantity += Number(selectQuantity.value);
              }else{
                    cart.push({
                      productId:productId,
                      quantity : Number(selectQuantity.value),
                    });
              }

              let totaolQuantity=0;
              cart.forEach((item)=>{
                  totaolQuantity += item.quantity;
              });
              jsCartQuantity.textContent=totaolQuantity;

              const addedToCartElement=productContainer.querySelector('.added-to-cart');
              addedToCartElement.style.opacity = 0.6;

              setTimeout(()=>{
                addedToCartElement.style.opacity = 0;
              },1500);       
      });
     
});


