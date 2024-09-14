import { renderOrderSimmary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";
import { loadProuducts, loadProdutsFetch} from "../../data/products.js";

describe('test suite: renderOrderSimmary',()=>{
  const producrId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const producrId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d"

beforeAll((done)=>{
  loadProdutsFetch().then(()=>{
    done();
  }); 
});

  beforeEach(()=>{
      spyOn(localStorage,'setItem');

            document.querySelector('.js-test-container').innerHTML=`
            <div class='js-order-summary'> </div>
            <div class='js-payment-summary'> </div>
            <div class='js-item-quantity'> <span> <span> </div>
          `;
              spyOn(localStorage, 'getItem').and.callFake(() => {
                return JSON.stringify([{
                  productId:producrId1,
                  quantity:2,
                  deliveryOptionsId:'1',
                },{
                  productId:producrId2,
                  quantity:1,
                  deliveryOptionsId:'2',
                }]);
              });

              loadFromStorage();

              renderOrderSimmary();
  });


  it('displays the cart',()=>{

      expect(
        document.querySelectorAll('.js-cart-item-container').length
      ).toEqual(2);

      expect(
        document.querySelector(`.js-product-quantity-${producrId1}`).innerText
        ).toContain('Quantity: 2');

      expect(
        document.querySelector(`.js-product-quantity-${producrId2}`).innerText
        ).toContain('Quantity: 1');
  });

  it('remove a product',()=>{

          document.querySelector(`.js-delete-link-${producrId1}`).click();

          expect(
            document.querySelectorAll('.js-cart-item-container').length
          ).toEqual(1);
          
          expect(
            document.querySelector(`.js-cart-container-${producrId1}`)
          ).toEqual(null);

          expect(
            document.querySelector(`.js-cart-container-${producrId2}`)
          ).not.toEqual(null);

          expect(cart.length).toEqual(1);
          expect(cart[0].productId).toEqual(producrId2);

      });

    afterEach(()=>{
      document.querySelector('.js-test-container').innerHTML='';  //to remove the external thing only display test cases
    });
});