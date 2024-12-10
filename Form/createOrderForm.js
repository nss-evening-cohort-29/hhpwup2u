import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const createOrderForm = (obj = {}) => {
  clearDom();
  const domString = `
<form id="${obj.firebaseKey ? `update-order--${obj.firebaseKey}` : 'submit-order'}">

<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Order Name</label>
  <input type="order-name" class="form-control" id="name" placeholder="customer name" value="${obj.orderName || ''}" required>
</div>
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Customer Phone</label>
  <input type="phone" class="form-control" id="custPhone" placeholder="customer phone" value="${obj.customerPhone || ''}" required>
</div>
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Customer Email</label>
  <input type="email" class="form-control" id="email" placeholder="name@example.com" value="${obj.customerEmail || ''}" required>
</div>
 <div class="form-group" id="select-menu">
      <label for="orderType" class="order-type">Order Type</label>
       <select class="form-control" placeholder="Select Order Type" id="order-type" name="order" value="${obj.orderType || ''}" required>
       <option value="">Select Order Type</option>
         <option value="phone" ${obj.orderType === 'Phone' ? 'selected' : ''}>Phone</option>
         <option value="in-person" ${obj.orderType === 'In Person' ? 'selected' : ''}>In Person</option>
       </select>
      </div>
       <button type="submit" class="btn btn-primary">Create Order</button>
       </form>`;

  renderToDOM('#form-container', domString);
};

export default createOrderForm;
