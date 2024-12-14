/* eslint-disable */
import { getOrders, getAllOrders } from "../api/apiOrders";
import showOrders from "../Dom/ordersPage";
import revenueBuilder from "../Dom/revenuePage";
import { getRevenue } from "../api/apiRevenue";
import createOrderForm from "../Form/createOrderForm";


const navEvent = (user , admin) => {
    document.querySelector('#NavivationRefs').addEventListener('click', (e) => {

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

        })
    }

export default navEvent;
