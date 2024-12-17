import renderToDOM from '../utils/renderToDom';
import clearDom from '../utils/clearDom';

/* eslint-disable */

const showMenuItems = (array, admin) => {
  clearDom();
  let domString = ""

  if (admin === 2) {
    domString += '<button type="button" class="menu-btn" id="add-menu-btn">Add Item</button>';
  }

  domString += `<div class="mmmm" id="menu-card-container-container">`
  array.forEach((item) => {
    domString += `
    <div class="menu-card-container">
      <div class="menu-item-card">
        <div class="menu-item-body">
        <h1 class="menu-item-title">${item.menuItemName}</h1>
        <hr>
        </div>
        <img class="menu-card-img-top" src=${item.menuItemImage} alt=${item.menuItemName} ">
        <h2 class="card-text bold">${item.menuItemSale ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i>💸  </span> $${item.menuItemPrice}` : `$${item.menuItemPrice}`}</h2>
        ${admin === 2 ? `<a href="#" class="card-link" id="delete-menu-btn--${item.firebaseKey}">Delete</a>` : ''}
        ${admin === 2  ? `<a href="#" class="card-link" id="edit-menu-btn--${item.firebaseKey}">Edit</a>` : ''}
        <button type="button" class="menu-order-btn" id="Order-menu-btn--${item.firebaseKey}">Order</button>
      </div>
    </div>`;
  });
  domString += `</div>`

  renderToDOM('#main-container', domString);
};

export default showMenuItems;
