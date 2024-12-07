import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

/* eslint-disable indent, no-trailing-spaces, no-multiple-empty-lines */ 
const showItems = (array) => {
    clearDom();
    
    let domstring = `
      <div class="text-4xl font-bold text-center my-4" id="totalPrice">
        <h1><b>Total (work in progress)</b></h1>
      </div>
    `;

    array.forEach((item) => { 
        domstring += `
            <div class="item-card-body">
              <h5 class="card-title">${item.itemName}</h5>
              <h5 class="card-title">${item.itemPrice}</h5>
              <button type="button" class="btn btn-dark" id="delete-item-btn__${item.orderFirebaseKey}">Delete</button>
              <button type="button" class="btn btn-dark" id="edit-item-btn__${item.orderFirebaseKey}">Edit</button>
            </div>
        `;
      });

    domstring += `
        <div>
            <button type="button" class="btn btn-success" id="add-item-btn">Add Item</button>
            <button type="button" class="btn btn-success" id="payment-order-btn">Go To Payment</button>
        </div>
    `;

    renderToDOM('#main-container', domstring);
};

export default showItems;
