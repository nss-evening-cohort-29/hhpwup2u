import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const BookArtistForm = () => {
  clearDom();
  const domString = `
<form id="book-new-artist-submit">
  <div class="mb-3">
    <label class="form-label">Artist Name</label>
    <input type="text" class="form-control" id="artistName" required>
  </div>

  <div class="mb-3">
    <label class="form-label">Artist Image (Link)</label>
    <input type="url" class="form-control" id="artistImage" placeholder="https://example.com/image.jpg" required>
  </div>

  <div class="mb-3">
    <label class="form-label">Description</label>
    <input type="text" class="form-control" id="artistDescription" required>
  </div>

  <div class="mb-3">
    <label class="form-label">Performance Date</label>
    <input type="date" class="form-control" id="artistPDate" required>
  </div>

  <button type="submit" class="btn btn-primary">Book!</button>
</form>
`;

  renderToDOM('#form-container', domString);
};

export default BookArtistForm;
