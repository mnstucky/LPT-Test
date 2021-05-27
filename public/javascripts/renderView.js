async function getTraceData() {
  try {
    const rawTraceData = await fetch('./api/');
    const traceData = await rawTraceData.json();
    return traceData;
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener('readystatechange', async (event) => {
  if (event.target.readyState === 'complete') {
    const traceData = await getTraceData();
    console.log(traceData);
  }
});
