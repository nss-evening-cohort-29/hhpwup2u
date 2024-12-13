/* eslint-disable */
import renderToDOM from "../utils/renderToDom";

const revenueBuilder = (closedOrders) => {

    let totalRevenue = 0;
    closedOrders.forEach((item) => {
      totalRevenue += parseFloat(item.totalOrderAmount);
    });

    let totaltips = 0;
    closedOrders.forEach((item) => {
        totaltips += parseFloat(item.tipAmount);
    });

    let totalCall = 0
    closedOrders.forEach((item) => {
        if (item.orderType === "phone") {
        totalCall += 1;
        }
    });

    let totalWalk = 0
    closedOrders.forEach((item) => {
        if (item.orderType === "in-person") {
        totalWalk += 1;
        }
    });

    let typeCash = 0
    closedOrders.forEach((item) => {
        if (item.paymentType === "Cash") {
        typeCash += 1;
        }
    });

    let typeCredit = 0
    closedOrders.forEach((item) => {
      if (item.paymentType === "Card") {
      typeCredit += 1;
      }
    });

    let domstring = `
    <div>
        <h1> REVENUE </h1>
        <h1> Total Revenue: $${totalRevenue.toFixed(2)} </h1>
        
        <h4> Date range: TODO </h4>
        <h4> Total tips: $${totaltips.toFixed(2)}</h4>
        <h4> Total CALL IN orders: ${totalCall} </h4>
        <h4> Total WALK IN orders: ${totalWalk} </h4>
        

        <h4> Payment Types: CASH - ${typeCash} CARD - ${typeCredit}</h4>

    </div>
  `;

  renderToDOM('#main-container', domstring);

}

export default revenueBuilder; 
