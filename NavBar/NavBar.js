/* eslint-disable */ 
import renderToDOM from '../utils/renderToDom';

const buildNavBar = () => { 
     const domString = `
        <nav class="navbar navbar-expand-lg bg-body-tertiary" id="entireNav">
            <div class="container-fluid" id="NavigationRefs">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                    <a class="nav-link" href="#" id="homeNav">Venue</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#" id="create-order">Create Order</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#" id="viewOrderNav">View Orders</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#" id="menu">Menu</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#" id="revenueNav">Revenue</a>
                    </li>
                </ul>
                <div id="logoutNavLocation">
                </div>
            </div>
            </nav>
     `
     renderToDOM('#navigation', domString);
}

export default buildNavBar;
