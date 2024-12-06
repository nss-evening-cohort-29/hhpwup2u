import renderToDOM from '../utils/renderToDom';

/* eslint-disable indent, no-trailing-spaces, no-multiple-empty-lines */
const homeBuilder = () => {
  const domString = `
  <div id="homeScreen">
  <h5> Welcome to Our Project </h5>
    <button type="button" class="btn btn-secondary">View Order</button>
    <button type="button" class="btn btn-secondary">Create Order</button>
    <button type="button" class="btn btn-secondary">View Revenue</button>
    <button type="button" class="btn btn-secondary" id="temporaryitem-btn">Temporary Button go to item</button>
  </div>`;

  renderToDOM('#app', domString);
};

export default homeBuilder;
