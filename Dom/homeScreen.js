import renderToDOM from '../utils/renderToDom';

/* eslint-disable indent, no-trailing-spaces, no-multiple-empty-lines */
const homeBuilder = (user) => {
  const domString = `
  <div id="homeScreen">
  <h5> Welcome ${user.displayName}</h5>
    <div id="carouselExampleIndicators" class="carousel slide">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="https://tse3.mm.bing.net/th?id=OIF.QU2eZGR3AJzvEDkfcLQMdw&pid=Api&P=0&h=220" class="d-block" alt="...">
        </div>
        <div class="carousel-item">
          <img src="https://iconichipster.com/wp-content/uploads/2024/12/taylorswift.webp" class="d-block" alt="...">
        </div>
        <div class="carousel-item">
          <img src="https://d.newsweek.com/en/full/2534899/taylor-swift-first-concert-after-breakup.jpg" class="d-block" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>`;

  renderToDOM('#main-container', domString);
};

export default homeBuilder;
