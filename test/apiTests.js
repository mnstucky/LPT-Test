const chai = require('chai');

chai.should();
chai.use(require('chai-things'));
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('API endpoint tests', () => {
  it('A GET request to the API endpoint returns the correct status', (done) => {
    chai.request('http://localhost:3000')
      .get('/api')
      .end((err, res) => {
        res.statusCode.should.equal(200);
        done();
      });
  });
  it('A GET request returns an array of 50 results', (done) => {
    chai.request('http://localhost:3000')
      .get('/api')
      .end((err, res) => {
        res.body.should.be.an('array');
        res.body.should.have.lengthOf(50);
        done();
      });
  });
  it('Each array entry has id, powerLevels, and time properties', (done) => {
    chai.request('http://localhost:3000')
      .get('/api')
      .end((err, res) => {
        res.body.should.all.have.property('id');
        res.body.should.all.have.property('powerLevels');
        res.body.should.all.have.property('time');
        done();
      });
  });
  it('Powerlevels should be an array', (done) => {
    chai.request('http://localhost:3000')
      .get('/api')
      .end((err, res) => {
        for (const element of res.body) {
          element.powerLevels.should.be.an('array');
        }
        done();
      });
  });
  it('id should be a number', (done) => {
    chai.request('http://localhost:3000')
      .get('/api')
      .end((err, res) => {
        for (const element of res.body) {
          element.id.should.be.a('number');
        }
        done();
      });
  });
  it('time should be a string', (done) => {
    chai.request('http://localhost:3000')
      .get('/api')
      .end((err, res) => {
        for (const element of res.body) {
          element.time.should.be.a('string');
        }
        done();
      });
  });
});
