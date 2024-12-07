/* eslint-disable */ 
import renderToDOM from '../utils/renderToDom';

const buildNavBar = () => { 
     const domString = `
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand">Navbar</a>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                    <a class="nav-link">NO FUNCTION YET ALL OF THESE Create Order</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link">View Order</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link">Revenue</a>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
                </div>
            </div>
            </nav>
     `
     renderToDOM('#navBar', domString);
}

export default buildNavBar;