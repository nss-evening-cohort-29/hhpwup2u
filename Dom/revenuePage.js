/* eslint-disable */
import renderToDOM from '../utils/renderToDom';
import clearDom from '../utils/clearDom';
import moneyFormat from '../utils/moneyFormat';

const revenueBuilder = (closedOrders) => {
  clearDom();
  const domstring = `
  <div>
      <h1> REVENUE </h1>
      <h4>Search Date Range:</h4>
        <div id='reportrange' style='background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc; width: 100%'>
          <i class='fa fa-calendar'></i>&nbsp;
          <span></span> <i class='fa fa-caret-down'></i>
        </div>
      <button type='button' class='btn btn-secondary' id='search-date-range'>Search</button>
      <div id='revenue-render'></div>
  </div>
`;
  let startSearch = '';
  let endSearch = '';

  $(function () {
    const start = moment().subtract(29, 'days');
    const end = moment();

    function cb (start, end) {
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

const dateSearch = (array, startSearch, endSearch) => {
  let [totalRevenue, totaltips, totalCall, totalWalk, typeCash, typeCredit] = [
    0, 0, 0, 0, 0, 0,
  ];
  const filteredArr = array.filter(
    (order) => order.timeClosed > startSearch && order.timeClosed < endSearch
  );
  filteredArr.forEach((item) => {
    totalRevenue += parseFloat(item.totalOrderAmount);
    totaltips += parseFloat(item.tipAmount);
    if (item.orderType === 'phone') {
      totalCall += 1;
    }
    if (item.orderType === 'in-person') {
      totalWalk += 1;
    }
    if (item.paymentType === 'Cash') {
      typeCash += 1;
    }
    if (item.paymentType === 'Card') {
      typeCredit += 1;
    }
  });
  let newdomstring = `<h1> Total Revenue: ${moneyFormat(totalRevenue)} </h1>
  <h4> Total tips: ${moneyFormat(totaltips)}</h4>
  <h4> Total CALL IN orders: ${totalCall} </h4>
  <h4> Total WALK IN orders: ${totalWalk} </h4>
  <h4> Payment Types: CASH - ${typeCash} CARD - ${typeCredit}</h4>`;
  renderToDOM('#revenue-render', newdomstring);
};

export default revenueBuilder;
