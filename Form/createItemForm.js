import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const createItemForm = (itemObj = {}, orderFirebaseKey) => {
  clearDom();
  const domString = `
<form id="${itemObj.firebaseKey ? `update-item--${itemObj.firebaseKey}--${orderFirebaseKey}` : `submit-item--${orderFirebaseKey}`}">


<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Item Name</label>
  <input type="name" class="form-control" id="item-name" placeholder="item name" value="${itemObj.itemName || ''}" required>
</div>
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Item Price</label>
  <input type="price" class="form-control" id="item-price" placeholder="item price" value="${itemObj.itemPrice || ''}" required>
</div>
  <button type="submit" class="btn btn-primary">Create Item</button>
</form>`;
  renderToDOM('#form-container', domString);
};

export default createItemForm;
