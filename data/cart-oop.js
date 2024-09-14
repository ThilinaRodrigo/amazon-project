function Cart(localStorageKey){
  const cart= {
          cartItems : undefined,

          loadFromStorage(){
        
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
          
            if(!this.cartItems){
                  this.cartItems=[{
                            productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                            quantity:2,
                            deliveryOptionsId:'1',
                          },{
                            productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
                            quantity:1,
                            deliveryOptionsId:'2',
                          }];
                          
                  }
          },

          saveToStorage(){
            localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));
          },

        addToCart(productId,selectQuantity,inputQuantity){
            let matchingItem;
            this.cartItems.forEach((cartItem)=>{
              if(productId === cartItem.productId){
                matchingItem = cartItem;
              }
            });
            const addedQuantity = Number(selectQuantity ? selectQuantity.value : 0) + Number(inputQuantity || 0);
            if(matchingItem){
                  matchingItem.quantity += addedQuantity;
          
            }else{
                  this.cartItems.push({
                    productId:productId,
                    quantity : addedQuantity,
                    deliveryOptionsId:'1',
                  });
            }
            this.saveToStorage();
          },


          removeFromCart(productId){
            const newCart = [];
          
              this.cartItems.forEach((cartItem)=>{
                    if(productId !== cartItem.productId){
                      newCart.push(cartItem);
                    }
              });
          
              this.cartItems = newCart;
              this.saveToStorage()
              updateCartQuantity();
          },

          updateDeliveryOption(productId,deliveryOptionId){
            let matchingItem;
          
            this.cartItems.forEach((cartItem)=>{
              if(productId === cartItem.productId){
                matchingItem = cartItem;
              }
            });
          
            matchingItem.deliveryOptionsId = deliveryOptionId;
          
            this.saveToStorage();
          },


          updateCartQuantity(){
            let totaolQuantity=0;
            this.cartItems.forEach((cartItem)=>{
                totaolQuantity += cartItem.quantity;
            });
            localStorage.setItem('totalQuantity',totaolQuantity );
          },

      };

    return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('business-oop');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);




