const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');


const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
  it('Post to /api/drivers create a new driver', (done) => {
    Driver.count().then((count) => {

      request(app)
        .post('/api/drivers')
        .send({
          email: 'test@test.com'
        })
        .end(() => {

          Driver.count().then((newCount) => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });

  it('PUT to /api/:id edits exisisting driver', (done) => {
    const driver = new Driver({
      email: 't@t.com'
    });
    driver.save().then((driver) => {
      console.log(driver);
      request(app)
        .put('/api/drivers/' + driver._id)
        .send({
          driving: true
        })
        .end(() => {
          Driver.findOne({
              email: 't@t.com'
            })
            .then((driver) => {
              console.log(driver);
              assert(driver.driving === true);
              done();
            });
        });
    });
  });

  it('DELETE driver', (done) => {
    const driver = new Driver({
      email: "driver@driver.com",

    });
    driver.save().then((driver) => {
      console.log(driver);
      request(app)
        .delete('/api/drivers/' + driver._id)
        .end(() => {
          Driver.count().then((count) => {
            assert(count === 0);
            done();
          });
        });
    });
  });

  it('GET to /api/drivers finds drivers in a location', done => {
    const driverSeattle = new Driver({
      email: 'seattle@test.com',
      geometry: {
        type: 'Point',
        coordinates: [-122.475, 47.614]
      }
    });
    const driverMiami = new Driver({
      email: 'miami@test.com',
      geometry: {
        type: 'Point',
        coordinates: [-80.253, 25.791]
      }
    });

    Promise.all([
      driverSeattle.save(),
      driverMiami.save()
    ])
      .then((drivers) => {
        console.log(drivers)
        request(app)
          .get('/api/drivers?lng=-80&lat=25')
          .end((err, response) => {
            console.log(response);
          });
      });
  });
});
