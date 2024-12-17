import renderToDOM from '../utils/renderToDom';
import clearDom from '../utils/clearDom';

/* eslint-disable */
const homeBuilder = (user, artists) => {

  clearDom();
  let domString = `

  <div> 
  <button type="button" class="btn btn-outline-info" id="book-new-artist"">Book New Artist</button>
  </div>

  <div id="homeScreen">
    <h5> Welcome ${user.displayName}</h5>
    <div id="carouselExampleIndicators" class="carousel slide">

      <div class="carousel-indicators">`;

  artists.forEach((artist, index) => {
    domString += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" class="${index === 0 ? 'active' : ''}" aria-label="Slide ${index + 1}"></button>`;
  });

  domString += `</div>

      <div class="carousel-inner">`;

  artists.forEach((artist, index) => {
    domString += `
      <div class="carousel-item ${index === 0 ? 'active' : ''}">
        <img src="${artist.artistImage}" class="d-block w-100" alt="image of artist">
        <div class="carousel-caption d-none d-md-block">
          <h5>${artist.artistName}</h5>
          <p>${artist.artistDescription}</p>
          <p>${artist.performanceDate}</p>
          <p>${artist.location}</p>
        </div>
      </div>
      `;
  });

  domString += `
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
