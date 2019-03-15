process.env.NODE_ENV = 'test';
process.env.PORT = 6000;

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;

const server = require('.');

const cases = [
  {
    name: 'should return bar',
    input: 'foo',
    output: 'bar',
  },
];

const errors = [
  {
    name: 'should error on foo',
    input: 'foo',
    status: 400,
    message: 'Invalid foo',
  },
];

describe('GET /', () => {
  const url = '/';

  cases.forEach(({ name, input, output }) => {
    it(name, done => {
      chai
        .request(server)
        .get(`${url}?q=${input}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.text).to.equal(output);
          done();
        });
    });
  });

  errors.forEach(({ name, input, status, message }) => {
    it(name, done => {
      chai
        .request(server)
        .get(`${url}?q=${input}`)
        .end((err, res) => {
          expect(res.status).to.equal(status);
          expect(res.text).to.equal(message);
          done();
        });
    });
  });
});
