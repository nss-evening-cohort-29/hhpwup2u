import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const closeOrderForm = (closeObj = {}) => {
  clearDom();
  const domString = `
<form id="${closeObj.firebaseKey}"
  <div class="form-group" id="select-menu">
      <label for="paymentType" class="order-type">Order Type</label>
       <select class="form-control" placeholder="Select Order Type" id="category" name="order" value="${closeObj.paymentType || ''}" required>
       <option value="">Select Order Type</option>
         <option value="phone" ${closeObj.paymentType === 'Cash' ? 'selected' : ''}>Cash</option>
         <option value="in-person" ${closeObj.paymentType === 'Card' ? 'selected' : ''}>Card</option>
       </select>
      </div>
      <div class="mb-3">
  <label for="tip-" class="form-label">Item Price</label>
  <input type="tip" class="form-control" id="tip-amount" placeholder="tip amount" value="${closeObj.tipAmount || ''}" required>
</div>`;

  renderToDOM('#form-container', domString);
};

export default closeOrderForm;
