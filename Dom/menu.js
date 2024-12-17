import renderToDOM from '../utils/renderToDom';
import clearDom from '../utils/clearDom';

/* eslint-disable */

const showMenuItems = (array, admin) => {
  clearDom();
  let domString = ""

  if (admin === 2) {
    domString += '<button type="button" class="btn btn-success" id="add-menu-btn">Add Item</button>';
  }

  array.forEach((item) => {
    domString += `
    <div class="menu-item-card" style="width: 15rem;">
    <div class="menu-item-body">
      <h5 class="menu-item-title">${item.menuItemName}</h5>
      <hr>
      </div>
      <img class="menu-card-img-top" src=${item.menuItemImage} alt=${item.menuItemName} style="height: 40px;">
      <p class="card-text bold">${item.menuItemSale ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${item.menuItemPrice}` : `$${item.menuItemPrice}`}</p>
      ${admin === 2 ? `<a href="#" class="card-link" id="delete-menu-btn--${item.firebaseKey}">Delete</a>` : ''}
      ${admin === 2  ? `<a href="#" class="card-link" id="edit-menu-btn--${item.firebaseKey}">Edit</a>` : ''}
      <button type="button" class="btn btn-success" id="Order-menu-btn--${item.firebaseKey}">Order</button>
  </div>`;
  });
  renderToDOM('#main-container', domString);
};

export default showMenuItems;
