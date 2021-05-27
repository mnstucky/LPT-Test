async function getTraceData() {
  try {
    const rawTraceData = await fetch('./api/');
    const traceData = await rawTraceData.json();
    return traceData;
  } catch (error) {
    console.error(error);
  }
}

function formatDataForGoogleCharts(traceData) {
  const formattedTraceData = [];
  formattedTraceData.push(['MHz', 'dBm']);
  let currentMHz = 850;
  for (const trace of traceData.powerLevels) {
    formattedTraceData.push([currentMHz, trace]);
    currentMHz += (1 / 3);
  }
  return formattedTraceData;
}

function drawChart(formattedTraceData) {
  const dataToDraw = google.visualization.arrayToDataTable(formattedTraceData);
  const options = {
    title: 'Chart',
    legend: { position: 'bottom' },
  };
  const chart = new google.visualization.LineChart(document.getElementById('chart'));
  chart.draw(dataToDraw, options);
}

function processTraceData(traceData, traceDataIndex) {
  const formattedTraceData = formatDataForGoogleCharts(traceData[traceDataIndex]);
  drawChart(formattedTraceData);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

document.addEventListener('readystatechange', async (event) => {
  if (event.target.readyState === 'complete') {
    await google.charts.load('current', { packages: ['corechart'] });
    const traceData = await getTraceData();
    let traceDataIndex = 0;
    while (true) {
      processTraceData(traceData, traceDataIndex);
      if (traceDataIndex < traceData.length) {
        traceDataIndex += 1;
      } else {
        traceDataIndex = 0;
      }
      await sleep(1000);
    }
  }
});
