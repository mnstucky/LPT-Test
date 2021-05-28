// Declare module-level variables to track application state

//  isPaused tracks whether the user has paused the page animation
let isPaused = false;
//  traceDataIndex tracks which trace the application is currently displaying
let traceDataIndex = 0;

// Declare functions

// getTraceData calls the application's API
// The data returned by the API is an array of these objects:
// {
//   id: 50,
//       powerLevels: [
//   -52.789, -52.399, -52.439,   -54.5, -52.979, -52.869,  -54.75,
//   ...
//   ],
//     time: 2019-01-17T15:30:08.000Z
// }
async function getTraceData() {
  try {
    const rawTraceData = await fetch('./api/');
    const traceData = await rawTraceData.json();
    console.log(traceData);
    return traceData;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

// formatDataForGoogleCharts converts API data into data consumable
//  by the Google Charts API
function formatDataForGoogleCharts(traceData) {
  const formattedTraceData = [];
  formattedTraceData.push(['MHz', 'dBm']);
  let currentMHz = 850;
  // eslint-disable-next-line no-restricted-syntax
  for (const trace of traceData.powerLevels) {
    formattedTraceData.push([currentMHz, trace]);
    currentMHz += (1 / 2);
  }
  return formattedTraceData;
}

// drawChart renders a single chart from the inputted data and timestamp
function drawChart(formattedTraceData, timeStamp) {
  // eslint-disable-next-line no-undef
  const dataToDraw = google.visualization.arrayToDataTable(formattedTraceData);
  const options = {
    title: timeStamp,
    vAxis: {
      title: 'dBm',
      titleTextStyle: {
        italic: false,
        bold: true,
      },
      maxValue: -30,
      minValue: -130,
      ticks: [-130, -120, -110, -100, -90, -80, -70, -60, -50, -40, -30],
    },
    hAxis: {
      title: 'MHz',
      titleTextStyle: {
        italic: false,
        bold: true,
      },
    },
    legend: {
      position: 'none',
    },
  };
  // eslint-disable-next-line no-undef
  const chart = new google.visualization.LineChart(document.getElementById('chart'));
  chart.draw(dataToDraw, options);
}

// sleep pauses program execution for the specified number of milliseconds
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// startAnimation receives the entire block of API data and renders a series of charts,
//  with the current chart refreshing every one second
async function startAnimation(traceData) {
  while (!isPaused) {
    const formattedTraceData = formatDataForGoogleCharts(traceData[traceDataIndex]);
    drawChart(formattedTraceData, traceData[traceDataIndex].time);
    if (traceDataIndex < traceData.length - 1) {
      traceDataIndex += 1;
    } else {
      traceDataIndex = 0;
    }
    // eslint-disable-next-line no-await-in-loop
    await sleep(1000);
  }
}

// handlePauseButton starts and stop the chart animation upon a click
function handlePauseButton(event, traceData) {
  const pauseButton = document.getElementById('pause');
  if (!isPaused) {
    isPaused = true;
    pauseButton.textContent = 'Resume';
  } else {
    isPaused = false;
    pauseButton.textContent = 'Pause';
    startAnimation(traceData, traceDataIndex);
  }
}

// Call functions and declare event listeners to start the application

document.addEventListener('readystatechange', async (event) => {
  if (event.target.readyState === 'complete') {
    // eslint-disable-next-line no-undef
    await google.charts.load('current', { packages: ['corechart'] });
    const traceData = await getTraceData();
    const pauseButton = document.getElementById('pause');
    pauseButton.addEventListener('click', (buttonEvent) => {
      handlePauseButton(buttonEvent, traceData);
    });
    if (traceData) {
      startAnimation(traceData, 0);
      // Display an error if there is no traceData
    } else {
      const chartContainer = document.getElementById('chart');
      chartContainer.textContent = 'Sorry, something went wrong.';
    }
  }
});

exports.getTraceData = getTraceData;
exports.formatDataForGoogleCharts = formatDataForGoogleCharts;
exports.drawChart = drawChart;
