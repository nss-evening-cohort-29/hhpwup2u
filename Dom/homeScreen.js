import renderToDOM from '../utils/renderToDom';

/* eslint-disable indent, no-trailing-spaces, no-multiple-empty-lines */
const homeBuilder = (user) => {
  const domString = `
  <div id="homeScreen">
  <h5> Welcome ${user.displayName}</h5>
    <button type="button" class="btn btn-secondary" id="view-order-btn">View Orders</button>
    <button type="button" class="btn btn-secondary" id="create-order-btn">Create Order</button>
    <button type="button" class="btn btn-secondary" id="view-revenue">View Revenue</button>
  </div>`;

  renderToDOM('#main-container', domString);
};

export default homeBuilder;
