/* eslint-disable */
import { GetOrders } from "../api/apiOrders";
import showOrders from "../Dom/ordersPage";

const navEvent = (user) => {
    document.querySelector('#NavivationRefs').addEventListener('click', (e) => {
        e.preventDefault();
        
        //SECTION FOR VIEW ORDER CLICK
        if (e.target.id.includes('viewOrderNav')) {
            GetOrders(user.uid).then(showOrders);
        }
    
        })
    }

export default navEvent;
