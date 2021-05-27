async function getTraceData() {
  try {
    const rawTraceData = await fetch('./api/');
    const traceData = await rawTraceData.json();
    return traceData;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

function formatDataForGoogleCharts(traceData) {
  const formattedTraceData = [];
  formattedTraceData.push(['MHz', 'dBm']);
  let currentMHz = 850;
  for (const trace of traceData.powerLevels) {
    formattedTraceData.push([currentMHz, trace]);
    currentMHz += (1 / 2);
  }
  return formattedTraceData;
}

function drawChart(formattedTraceData, timeStamp) {
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
  const chart = new google.visualization.LineChart(document.getElementById('chart'));
  chart.draw(dataToDraw, options);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function startAnimation(traceData, traceDataIndex) {
  while (true) {
    const formattedTraceData = formatDataForGoogleCharts(traceData[traceDataIndex]);
    drawChart(formattedTraceData, traceData[traceDataIndex].time);
    if (traceDataIndex < traceData.length - 1) {
      traceDataIndex += 1;
    } else {
      traceDataIndex = 0;
    }
    await sleep(1000);
  }
}

document.addEventListener('readystatechange', async (event) => {
  if (event.target.readyState === 'complete') {
    await google.charts.load('current', { packages: ['corechart'] });
    const traceData = await getTraceData();
    if (traceData) {
      startAnimation(traceData, 0);
    } else {
      const chartContainer = document.getElementById('chart');
      chartContainer.textContent = 'Sorry, something went wrong.';
    }
  }
});
