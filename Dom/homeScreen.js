import renderToDOM from '../utils/renderToDom';

/* eslint-disable indent, no-trailing-spaces, no-multiple-empty-lines */
const homeBuilder = () => {
  const domString = `
  <div id="homeScreen">
  <h5> Welcome to Our Project </h5>
    <button type="button" class="btn btn-secondary" id="view-order-btn">View Orders</button>
    <button type="button" class="btn btn-secondary">Create Order NEED WORK</button>
    <button type="button" class="btn btn-secondary">View Revenue</button>
  </div>`;

  renderToDOM('#main-container', domString);
};

export default homeBuilder;
