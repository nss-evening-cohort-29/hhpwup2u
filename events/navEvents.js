/* eslint-disable */
import { getOrders, getAllOrders } from "../api/apiOrders";
import showOrders from "../Dom/ordersPage";
import revenueBuilder from "../Dom/revenuePage";
import { getRevenue } from "../api/apiRevenue";
import createOrderForm from "../Form/createOrderForm";
import  showItems  from "../Dom/menu";
import { getMenuItems } from "../api/apiMenu";
import showMenuItems from "../Dom/menu";


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
            else (getOrders(user.uid).then(showOrders))
        }
        //SECTION FOR VIEW REVENUE
        if (e.target.id.includes('revenueNav')) {
            getRevenue().then((closedOrders) => revenueBuilder(closedOrders))
        }

        if (e.target.id.includes('menu')) {
            console.log("trigger")
            getMenuItems().then((item) => showMenuItems(item))
        }

        })
    }

export default navEvent;
