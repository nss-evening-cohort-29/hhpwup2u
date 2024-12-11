import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const showOrders = (array) => {
  // If order is open, put it at the beginning
  const sortedOrders = array.sort((a, b) => {
    if (a.status === 'open') return -1;
    if (b.status === 'open') return 1;
    if (a.status === 'closed') return 1;
    if (b.status === 'closed') return -1;
    return 0;
  });
  clearDom();

  let domString = '';

  sortedOrders.forEach((order) => {
    domString += `
      <div class="card" style="width: 18rem;">
        <div class="card-body ">
          <h5 class="card-title">${order.orderName}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${order.status === 'closed' ? 'Closed' : 'Open'}</h6>
          <p class="card-text">${order.customerPhone}</p>
          <p class="card-text">${order.customerEmail}</p>
          <p class="card-text">${order.orderType}</p>
          <a href="#" class="card-link" id="details-order-btn__${order.firebaseKey}">Details</a>
          <a href="#" class="card-link" id="edit-order-btn__${order.firebaseKey}">Edit</a>
          <a href="#" class="card-link" id="delete-order-btn__${order.firebaseKey}">Delete</a>
        </div>
      </div>`;
  });
  renderToDOM('#main-container', domString);
};

export default showOrders;
