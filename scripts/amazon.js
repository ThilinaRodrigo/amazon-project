import {cart, addToCart, updateCartQuantity} from '../data/cart.js';    //import {cart as myCart} from '../data/cart.js';
import { products, loadProdutsFetch ,loadProuducts} from '../data/products.js';

 loadProdutsFetch().then(() => {
  renderProductGrid()
}); 

function renderProductGrid(){
        const productsGrid = document.querySelector('.js-products-grid');
        let jsCartQuantity = document.querySelector('.js-cart-quantity');
        let filteredProducts;

        document.addEventListener('DOMContentLoaded', displayTataolQuantity());

        renderProducts(products);
        
        //Search option start
        const searchBtn = document.querySelector('.js-search-button');

        searchBtn.addEventListener('click', () => {
          const searchKeyWord = document.querySelector('.js-search-bar').value.toLowerCase();  
          
          const newURL =`amazon.html?search=${searchKeyWord}`
          searchBtn.parentNode.href = newURL;
          console.log(newURL); 
        });

        const url = new URL(window.location.href);
        const searchKeyWord = url.searchParams.get('search');
        document.querySelector('.js-search-bar').value = searchKeyWord;

        if(searchKeyWord != null){
            filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchKeyWord.toLowerCase()) ||
                product.keywords.some(keyword => keyword.toLowerCase().includes(searchKeyWord.toLowerCase()))
                );
              }else{
                filteredProducts = products;
              }

          if(filteredProducts.length == 0){
            productsGrid.innerHTML = `<p class='empty-result-msg'> No products matched your search. </p>`;
          }else{
            productsGrid.innerHTML = '';
            renderProducts(filteredProducts); 
          }
            //search option end

        function renderProducts(productsList) {
            productsList.forEach((product)=>{
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
                                                    src="${product.getStarsUrl()}">
                                                  <div class="product-rating-count link-primary">
                                                    ${product.rating.count}
                                                  </div>
                                                </div>

                                                <div class="product-price">
                                                  $${product.getPrice()}
                                                </div>

                                                <div class="product-quantity-container">
                                                  <select class='js-product-quantity-select'>
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

                                                ${product.extraInfoHTML()}

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
      }

        function displayTataolQuantity(){
          let totalQuantity = localStorage.getItem('totalQuantity') || 0;
          jsCartQuantity.textContent=totalQuantity;
        }

        document.querySelectorAll('.js-added-to-cart').forEach((addToCartBtn)=>{
              addToCartBtn.addEventListener('click',(event)=>{
                      const productContainer = event.target.closest('.product-container');
                      const selectQuantity = productContainer.querySelector('.js-product-quantity-select');
                      //add selecte list quantity
                      const productId = addToCartBtn.dataset.productId; //product-id => productId
                      addToCart(productId,selectQuantity,0);
                      updateCartQuantity();
                      displayTataolQuantity();

                      const addedToCartElement=productContainer.querySelector('.added-to-cart');
                      addedToCartElement.style.opacity = 0.6;
        
                      setTimeout(()=>{
                        addedToCartElement.style.opacity = 0;
                      },1500);        
              });
        });

}
