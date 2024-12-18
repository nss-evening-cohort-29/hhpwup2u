import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

/* eslint-disable */
const showOpenItemForMenu = (array , MenuItemKey) => {

  clearDom();

  let domString = '';
  domString += `<div class="iiiiiiii">`
  array.forEach((order) => {
    domString += `
      <div class="card" style="width: 18rem; margin-top: 35px;">
        <div class="card-body ">
          <h5 class="card-title">${order.orderName}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${order.status === 'close' ? 'Closed' : 'Open'}</h6>
          <p class="card-text">${order.customerPhone}</p>
          <p class="card-text">${order.customerEmail}</p>
          <p class="card-text">${order.orderType}</p>
          <a href="#" class="card-link" id="from-menu-add-order-btn__${order.firebaseKey}__${MenuItemKey}">Add to Order</a>
        </div>
      </div>`;
  });
  domString +=`</div>`
  renderToDOM('#main-container', domString);
};

export default showOpenItemForMenu;