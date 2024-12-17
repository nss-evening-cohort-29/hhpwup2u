import renderToDOM from '../utils/renderToDom';
import clearDom from '../utils/clearDom';

/* eslint-disable */
const homeBuilder = (user, artists, admin) => {

  clearDom();

  let domString = `
    <div id="homeScreen">
    <a class="navbar-brand" id="brandNav">Hip, Hop, Wangs and Thangs : VENUE EVENTS</a>
  `;

  // Welcome message and admin buttons come first
  domString += `
    <h5 id="WELCOMESIGN"> Welcome ${user.displayName}</h5>
  `;

  if (admin === 2) {
    domString += `
    <div> 
      <button type="button" class="btn btn-outline-info" id="book-new-artist">Book New Artist</button>
    </div>`;
  } 

  // Carousel comes after welcome message and admin buttons
  domString += `
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
          
          ${admin === 2 ? 
            `<button type="button" class="btn btn-outline-info delete-new-artist" id="delete-new-artist--${artist.firebaseKey}">Delete Event</button>`
            : 
            ''
          }
    
          <div class="carousel-caption d-none d-md-block">
            <h5>${artist.artistName}</h5>
            <p>${artist.artistDescription}</p>
            <p>${artist.performanceDate}</p>
          </div>
        </div>`;
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
  `;

  domString += `
  </div>`;

  renderToDOM('#main-container', domString);
};



export default homeBuilder;
