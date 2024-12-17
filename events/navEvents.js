/* eslint-disable */
import { getOrders, getAllOrders } from "../api/apiOrders";
import showOrders from "../Dom/ordersPage";
import revenueBuilder from "../Dom/revenuePage";
import { getAllRevenue, getRevenue } from "../api/apiRevenue";
import createOrderForm from "../Form/createOrderForm";
import  showItems  from "../Dom/menu";
import { getMenuItems } from "../api/apiMenu";
import showMenuItems from "../Dom/menu";
import homeBuilder from "../Dom/homeScreen";
import { getArtistItems } from "../api/apiArtist";


const navEvent = (user , admin) => {
    document.querySelector('#NavigationRefs').addEventListener('click', (e) => {

        e.preventDefault();

        document.querySelector('#create-order').addEventListener('click', () => {
            createOrderForm({});
        })
        
        //SECTION FOR VIEW ORDER CLICK
        if (e.target.id.includes('viewOrderNav')) {
            if (admin === 2) {
                getAllOrders().then(showOrders);
            }
            else (
                getOrders(user.uid).then(showOrders)
            )
        }
        //SECTION FOR VIEW REVENUE
        if (e.target.id.includes('revenueNav')) {
            if (admin === 2) {
                getAllRevenue().then((closedOrders) => revenueBuilder(closedOrders))
            }
            else (
                getRevenue(user.uid).then((closedOrders) => revenueBuilder(closedOrders))
            )
            
        }

        // MENU SECTION
        if (e.target.id.includes('menu')) {
            getMenuItems().then((item) => showMenuItems(item, admin))
        }

        
        // HOME 
        if (e.target.id.includes('homeNav')) {
            if(admin === 2) {
                getArtistItems().then ((artist) => homeBuilder(user, artist, admin))
            }
            else {
                getArtistItems().then ((artist) => homeBuilder(user, artist)) 
            }

        }

        })
    }

export default navEvent;
