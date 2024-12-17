import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

/* eslint-disable */
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

  let domString = `
  <div id="order-value">
    <div class="search-container">
      <form class="d-flex" role="search">
        <input class="form-control mr-sm-2" id="search" placeholder="Search by phone or name" aria-label="Search"/>
        <button class="btn btn-outline-success" id="SearchBox">Search</button>
      </form>
      <select class="form-control" id="order-status">
        <option value="all">Order Status</option>
        <option value="open">Open</option>
        <option value="closed">Closed</option>
      </select>
    </div>
  </div>`

  domString +=`<div id="OrderCardsSection">`
  sortedOrders.forEach((order) => {
    domString += `
      <div class="card">
        <div class="card-body ">
          <h5 class="card-title">${order.orderName}</h5>
          ${order.status === 'close' ? '<span class="badge text-bg-secondary" id= "badgeOnOrder">Closed</span>' : '<span class="badge rounded-pill text-bg-warning" id= "badgeOnOrder">Open</span>'}
          <p class="card-text">${order.customerPhone}</p>
          <p class="card-text">${order.customerEmail}</p>
          <p class="card-text">Order Type: ${order.orderType}</p>
          <a href="#" class="card-link" id="details-order-btn__${order.firebaseKey}__${order.status}">Details</a>
          ${order.status === 'open' ? `<a href="#" class="card-link" id="edit-order-btn__${order.firebaseKey}">Edit</a>` : ''}
          ${order.status === 'open' ? `<a href="#" class="card-link" id="delete-order-btn__${order.firebaseKey}">Delete</a>` : ''}
        </div>
      </div>`;
  });
  domString +=`</div>`
  renderToDOM('#main-container', domString);
};

export default showOrders;
