import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const closeOrderForm = (orderFirebaseKey) => {
  clearDom();
  const domString = `
<form id="closing-order-btn__${orderFirebaseKey}"
  <div class="form-group" id="payment-type">
      <label for="paymentType" class="order-type">Payment Type</label>
       <select class="form-control" placeholder="Select Payment Type" id="category" name="order" required>
       <option value="">Select Payment Type</option>
         <option value="phone">Cash</option>
         <option value="in-person">Card</option>
       </select>
      </div>
      <div class="mb-3">
  <label for="tip-" class="form-label">Item Price</label>
  <input type="tip" class="form-control" id="tip-amount" placeholder="tip amount" required>
  <button type="submit" class="btn btn-primary">Close Order</button>
</div>`;

  renderToDOM('#form-container', domString);
};

export default closeOrderForm;