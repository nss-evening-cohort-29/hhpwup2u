/* eslint-disable */
import renderToDOM from '../utils/renderToDom';
import clearDom from '../utils/clearDom';
import moneyFormat from '../utils/moneyFormat';
import createChart from '../components/createChart';
import { getItem } from '../api/apiItems';
import hexColorGenerator from '../utils/hexColorGenerator';

const revenueBuilder = (closedOrders) => {
  clearDom();
  // Page Header
  const domstring = `
  <div id="revenue-page">
      <h1> REVENUE </h1>
      <h4>Search Date Range:</h4>
        <div id='reportrange' style='background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc;'>
          <i class='fa fa-calendar'></i>&nbsp;
          <span></span> <i class='fa fa-caret-down'></i>
        </div>
      <button type='button' class='btn btn-secondary' id='search-date-range'>Search</button>
      <div id='revenue-render'></div>
      <div id='chart-render'>
        <canvas id="myChart"></canvas>
        <canvas id="myChart2"></canvas>
      </div>
  </div>
`;
  let startSearch = '';
  let endSearch = '';

  // Date Picking Stuff
  $(function () {
    const start = moment().subtract(29, 'days');
    const end = moment();

    function cb(start, end) {
      $('#reportrange span').html(
        start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY')
      );
      startSearch = start.valueOf();
      endSearch = end.valueOf();
    }

    $('#reportrange').daterangepicker(
      {
        startDate: start,
        endDate: end,
        ranges: {
          Today: [moment(), moment()],
          Yesterday: [
            moment().subtract(1, 'days'),
            moment().subtract(1, 'days'),
          ],
          'Last 7 Days': [moment().subtract(6, 'days'), moment()],
          'Last 30 Days': [moment().subtract(29, 'days'), moment()],
          'This Month': [moment().startOf('month'), moment().endOf('month')],
          'Last Month': [
            moment().subtract(1, 'month').startOf('month'),
            moment().subtract(1, 'month').endOf('month'),
          ],
        },
      },
      cb
    );

    cb(start, end);
  });

  renderToDOM('#main-container', domstring);

  document.querySelector('#search-date-range').addEventListener('click', () => {
    dateSearch(closedOrders, startSearch, endSearch);
  });
};

const dateSearch = async (array, startSearch, endSearch) => {
  let [totalRevenue, totaltips, totalCall, totalCallRevenue, totalWalk, totalWalkRevenue, typeCash, totalCashRevenue, typeCredit, totalCreditRevenue, totalOrders] = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ];
  const itemRevenueObj = {};
  const filteredArr = array.filter(
    (order) => order.timeClosed > startSearch && order.timeClosed < endSearch
  );
  
  for (const item of filteredArr) {
    const items = await getItem(item.orderFirebaseKey);  // Wait for getItem to resolve
    items.forEach((element) => {
      if (itemRevenueObj[element.itemName]) {
        itemRevenueObj[element.itemName] += parseFloat(element.itemPrice);
      } else {
        itemRevenueObj[element.itemName] = parseFloat(element.itemPrice);
      }
    });
    
    totalRevenue += parseFloat(item.totalOrderAmount);
    totaltips += parseFloat(item.tipAmount);
    totalOrders += 1;
    if (item.orderType === 'phone') {
      totalCall += 1;
      totalCallRevenue += parseFloat(item.totalOrderAmount);
    }
    if (item.orderType === 'in-person') {
      totalWalk += 1;
      totalWalkRevenue += parseFloat(item.totalOrderAmount);
    }
    if (item.paymentType === 'Cash') {
      typeCash += 1;
      totalCashRevenue += parseFloat(item.totalOrderAmount);
    }
    if (item.paymentType === 'Card') {
      typeCredit += 1;
      totalCreditRevenue += parseFloat(item.totalOrderAmount);
    }
  }

  // Second part of the DOM renders with revenue calculations
  let newdomstring = `<h1> Total Revenue: ${moneyFormat(totalRevenue)} </h1>
  <h4>Total orders: ${totalOrders}</h4>
  <h4>Average Revenue Per Order: ${totalRevenue === 0 ? moneyFormat(0): moneyFormat(totalRevenue / totalOrders)}</h4>
  <h4> Total tips: ${moneyFormat(totaltips)}</h4>
  <h4>Average Tip Per Order: ${totaltips === 0 ? moneyFormat(0): moneyFormat(totaltips / totalOrders)}</h4>
  <h4>View revenue by type:</h4>
  <button type="button" class="btn btn-dark" id="cash-vs-card">Payment Type</button>
  <button type="button" class="btn btn-dark" id="call-vs-walk">Order Type</button>
  <button type="button" class="btn btn-dark" id="best-sellers">Best Selling Items</button>`;
  let chartInstance = null;

// CHART STUFF
  renderToDOM('#revenue-render', newdomstring);
  // Default chart that renders when page is loaded
  createChart(
    'myChart',
    [`Cash: ${typeCash}`, `Card: ${typeCredit}`],
    [totalCashRevenue, totalCreditRevenue],
    ['#0da124', 'rgb(54, 162, 235)'],
    totalRevenue
  );

// Order Type Chart: Call-In vs. Walk-In
document.querySelector('#call-vs-walk').addEventListener('click', () => {
  createChart(
    'myChart',
    [`Call-In: ${totalCall}`, `Walk-In: ${totalWalk}`],
    [totalCallRevenue, totalWalkRevenue],
    ['#9B59B6', '#c48506'],
    totalRevenue
  );
})

// Payment Type Chart: Cash vs. Card
document.querySelector('#cash-vs-card').addEventListener('click', () => {
  createChart(
    'myChart',
    [`Cash: ${typeCash}`, `Card: ${typeCredit}`],
    [totalCashRevenue, totalCreditRevenue],
    ['#0da124', 'rgb(54, 162, 235)'],
    totalRevenue
  );
});

// Best Selling Items Chart
document.querySelector('#best-sellers').addEventListener('click', () => {
  createChart(
    'myChart',
    Object.keys(itemRevenueObj),
    Object.values(itemRevenueObj),
    hexColorGenerator(itemRevenueObj),
    totalRevenue
  );
});
};

export default revenueBuilder;
