
import { expect } from 'chai';

import express from 'express';
import request from 'supertest';

import api from 'server/routes/api';

describe('server api route', () => {

  const fakeResponse = 'FAKE_RESPONSE';

  it('forecast', done => {

    const fakeLocation = 'FAKE_LOCATION';

    api.__Rewire__('makeRequest', (req, res) => {
      expect(req.params.location).to.equal(fakeLocation);

      res.send(fakeResponse);
    });

    const fakeApp = express();

    fakeApp.use(api());

    request(fakeApp)
      .get(`/forecast/${fakeLocation}`)
      .expect(200, fakeResponse)
      .end(err => {
        if (err) {
          return done(err);
        }

        api.__ResetDependency__('makeRequest');

        done();
      });

  });

});
