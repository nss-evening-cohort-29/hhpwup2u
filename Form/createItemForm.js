import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const createItemForm = (itemObj = {}) => {
  clearDom();
  const domString = `
<form id="${itemObj.firebaseKey ? `update-order--${itemObj.firebaseKey}` : 'submit-order'}"

<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Item Name</label>
  <input type="name" class="form-control" id="exampleFormControlInput1" placeholder="item name" value="${itemObj.itemName || ''}" required>
</div>
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Item Price</label>
  <input type="price" class="form-control" id="exampleFormControlInput1" placeholder="item price" value="${itemObj.itemPrice || ''}" required>
</div>`;

  renderToDOM('#form-container', domString);
};

export default createItemForm;
