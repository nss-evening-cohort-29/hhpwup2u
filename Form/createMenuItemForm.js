/* eslint-disable */
import clearDom from "../utils/clearDom";
import renderToDOM from "../utils/renderToDom";

const createMenuItemForm = (menuItemObj = {}) => {
    clearDom();
    const domString = `

        <form id="${menuItemObj.firebaseKey ? `update-menu-item--${menuItemObj.firebaseKey}` : 'submit-menu-item'}">
<div class="form-group">
        <label for="title">Item Name</label>
        <input type="text" class="form-control" id="item-name" aria-describedby="itemName" placeholder="Enter Item Name" value="${menuItemObj.menuItemName || ''}" required>
      </div>
      <div class="form-group">
        <label for="image">Image URL</label>
        <input type="url" class="form-control" id="item-image" placeholder="Image URL" value="${menuItemObj.menuItemImage || ''}" required>
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input type="text" class="form-control" id="item-price" placeholder="Item Price" value="${menuItemObj.menuItemPrice || ''}" required>
      </div>
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="sale" ${menuItemObj.menuItemSale ? 'checked' : ''}>
        <label class="form-check-label" for="sale">On Sale?</label>
      </div>
      <button type="submit" class="btn btn-primary" id="submit-item-btn">Submit Item
      </button>
    </form>`;

    renderToDOM('#form-container', domString);
  };

  export default createMenuItemForm;
  