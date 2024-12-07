import clearDom from "../utils/clearDom"
import renderToDOM from "../utils/renderToDom"

const createOrderForm = (obj = {}) => {
  clearDom();
  const domString = `
<form id="${obj.firebaseKey ? `update-card--${obj.firebaseKey}` : 'submit-card'}"

<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Order Name</label>
  <input type="name" class="form-control" id="exampleFormControlInput1" placeholder="customer name">
</div>
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Customer Phone</label>
  <input type="phone" class="form-control" id="exampleFormControlInput1" placeholder="customer phone">
</div>
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Customer Email</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
</div>
 <div class="form-group" id="select-menu">
      <label for="category" class="category">Category</label>
       <select class="form-control" placeholder="Select Category" id="category" name="vocabCategory" value="${obj.orderType || ''}" required>
       <option value="">Select Category</option>
         <option value="phone" ${obj.orderType === 'Phone' ? 'selected' : ''}>Phone</option>
         <option value="in-person" ${obj.orderType === 'In Person'? 'selected' : ''}></option>In Person/option>
       </select>
      </div></ul>`;
}
