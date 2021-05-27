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

function drawCharts(formattedTraceData) {
  console.log(formattedTraceData);
  const dataToDraw = google.visualization.arrayToDataTable(formattedTraceData);
  const options = {
    title: 'Chart',
    legend: { position: 'bottom' },
  };
  const chart = new google.visualization.LineChart(document.getElementById('chart'));
  chart.draw(dataToDraw, options);
}

document.addEventListener('readystatechange', async (event) => {
  if (event.target.readyState === 'complete') {
    await google.charts.load('current', { packages: ['corechart'] });
    // google.charts.setOnLoadCallback(drawCharts);
    const traceData = await getTraceData();
    const formattedTraceData = formatDataForGoogleCharts(traceData[0]);
    drawCharts(formattedTraceData);
  }
});
