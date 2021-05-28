const chai = require('chai');
const { getTraceData, formatDataForGoogleCharts, drawChart } = require('../public/javascripts/renderView');

chai.should();
chai.use(require('chai-things'));

describe('API endpoint tests', () => {
  it('A GET request to the API endpoint returns the correct status', async (done) => {
    const traceData = await getTraceData();
    traceData.should.be.an('array');
    done();
  });
});
