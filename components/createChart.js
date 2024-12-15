/* eslint-disable */
import moneyFormat from '../utils/moneyFormat';
import renderToDOM from '../utils/renderToDom';

const createChart = (chartId, labels, data, backgroundColors, totalRevenue) => {
  const chartContainer = document.getElementById('chart-render');
  chartContainer.innerHTML = `<canvas id="${chartId}"></canvas>`; // Clear and add new canvas
  if (totalRevenue > 0) {
    const ctx = document.getElementById(chartId);
    const borderWidth = (data.filter((value) => value > 0).length === 1) ? 0 : 2; // Adjust borderWidth for single data point
    const hoverBorderWidth = (data.filter((value) => value > 0).length === 1) ? 0 : 4;

    // Destroy any existing chart instance to avoid duplicates
    if (window.chartInstance) {
      window.chartInstance.destroy();
    }

    // Define the chart data and options
    const chartData = {
      labels,
      datasets: [
        {
          label: 'Revenue',
          data,
          backgroundColor: backgroundColors,
          borderWidth,
          hoverBorderWidth,
        },
      ],
    };

    const chartOptions = {
      responsive: false,
      plugins: {
        tooltip: {
          callbacks: {
            label(context) {
              const value = context.raw; // Data value
              const percentage = ((value / totalRevenue) * 100).toFixed(1);
              return `${moneyFormat(value)}\n(${percentage}%)`; // Display percentage and currency
            },
          },
        },
      },
      rotation: 0,
    };

    // Create the chart
    window.chartInstance = new Chart(ctx, {
      type: 'pie',
      data: chartData,
      options: chartOptions,
    });
  } else {
    renderToDOM('#chart-render', '<p>No revenue for the selected date range.</p>');
  }
};

export default createChart;
