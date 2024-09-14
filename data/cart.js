export let cart;
loadFromStorage();

export function loadFromStorage(){
  
  cart = JSON.parse(localStorage.getItem('cart')) || [];


/* if(!cart){
      cart=[{
                productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity:2,
                deliveryOptionsId:'1',
              },{
                productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity:1,
                deliveryOptionsId:'2',
              }];
              
      }*/
} 

export function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId,selectQuantity,inputQuantity){
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });
  const addedQuantity = Number(selectQuantity ? selectQuantity.value : 0) + Number(inputQuantity || 0) || 1;
  if(matchingItem){
        matchingItem.quantity += addedQuantity;

  }else{
        cart.push({
          productId:productId,
          quantity : addedQuantity || 1,
          deliveryOptionsId:'1',
        });
  }
  saveToStorage();
  updateCartQuantity();
};

export function removeFromCart(productId){
  const newCart = [];

    cart.forEach((cartItem)=>{
          if(productId !== cartItem.productId){
            newCart.push(cartItem);
          }
    });

    cart = newCart;
    saveToStorage()
    updateCartQuantity();
};

export function updateCartQuantity(){
  let totaolQuantity=0;
  cart.forEach((cartItem)=>{
      totaolQuantity += cartItem.quantity;
  });
  localStorage.setItem('totalQuantity',totaolQuantity );
};


export function updateDeliveryOption(productId,deliveryOptionId){
  let matchingItem;

  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionsId = deliveryOptionId;

  saveToStorage();

}

const xhr = new XMLHttpRequest();

export function loadCart(fun){
  xhr.addEventListener('load',()=>{
    console.log(xhr.response)

    fun();
  });

xhr.open('GET','https://supersimplebackend.dev/cart');
xhr.send();
}
