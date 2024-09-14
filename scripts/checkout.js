import { renderOrderSimmary } from "./checkout/orderSummary.js";
import { randerPaymentSummary } from "./checkout/paymentSummary.js";
import {loadProuducts, loadProdutsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-class.js';
//import '../data/backend-practice.js'

async function loadPage(){
  try{
   // throw 'error1'
    await loadProdutsFetch();

    await new Promise((resolve,reject)=>{
     //throw 'error2'
      loadCart(()=>{
       // reject('error3')
        resolve();
      });
    })

  } catch(error){
    console.log('Unexpected error. Please try again later.');
  }
  
  renderOrderSimmary();
  randerPaymentSummary();
}

loadPage();

/* Promise.all([
  loadProdutsFetch(),

  new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  })

]).then((values)=>{
  console.log(values);
  renderOrderSimmary();
  randerPaymentSummary();
}); */

/* new Promise((resolve)=>{
  loadProuducts(()=>{
    resolve('value1');
  });

}).then((value)=>{
  console.log(value);

    return new Promise((resolve)=>{
      loadCart(()=>{
        resolve
      });
    });  

}).then(()=>{
  renderOrderSimmary();
  randerPaymentSummary();
});
 */

/* loadProuducts(()=>{
  loadCart(()=>{
    renderOrderSimmary();
    randerPaymentSummary();
  });
}); */
