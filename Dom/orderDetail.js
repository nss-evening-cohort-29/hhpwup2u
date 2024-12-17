import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';
/* eslint-disable */
const showItems = (array, firebaseKeyForOrder, orderStatus) => {
    clearDom();
    
    let totalPrice = 0;
    array.forEach((item) => {
      totalPrice += parseFloat(item.itemPrice);
    });

    let domstring = `
      <div class="text-4xl font-bold text-center my-4" id="totalPrice">
        <h1><b>Total: ${totalPrice}</b></h1>
      </div>
    `;

    array.forEach((item) => { 
        domstring += `
            <div class="item-card-body">
              <h5 class="card-title">${item.itemName}</h5>
              <h5 class="card-title">${item.itemPrice}</h5>
              ${orderStatus === 'close' ? 
                ''
                : 
                `
                <button type="button" class="btn btn-dark" id="delete-item-btn__${item.firebaseKey}__${item.orderFirebaseKey}">Delete</button>
                <button type="button" class="btn btn-dark" id="edit-item-btn__${item.firebaseKey}__${item.orderFirebaseKey}">Edit</button>
                `
                }
            </div>
        `;
      });

    domstring += `
        <div>
        ${orderStatus === 'close' ? '<span class="badge text-bg-danger">CLOSERD ORDER</span>' 
          : `
          <button type="button" class="btn btn-success" id="add-item-btn--${firebaseKeyForOrder}">Add Custom Item</button>
          <button type="button" class="btn btn-success" id="payment-order-btn--${firebaseKeyForOrder}--${totalPrice}">Go To Payment</button>
          <button type="button" class="btn btn-success" id="Go-to-Menu-from-item-btn">MENU
          </button>
          `
        }
        </div>
    `;

    renderToDOM('#main-container', domstring);
};

export default showItems;
