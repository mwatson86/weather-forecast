
import express from 'express';
import request from 'supertest';

import routes from 'server/routes';

describe('server routes', () => {

  const fakeResponse = 'FAKE_RESPONSE';

  it('api', done => {

    routes.__Rewire__('api', () => (req, res) => {
      res.send(fakeResponse);
    });

    const fakeApp = express();

    fakeApp.use(routes());

    request(fakeApp)
      .get('/api')
      .expect(200, fakeResponse)
      .end(err => {
        if (err) {
          return done(err);
        }

        routes.__ResetDependency__('api');

        done();
      });

  });

  it('renderer', done => {

    routes.__Rewire__('renderer', (req, res) => {
      res.send(fakeResponse);
    });

    const fakeApp = express();

    fakeApp.use(routes());

    request(fakeApp)
      .get('/')
      .expect(200, fakeResponse)
      .end(err => {
        if (err) {
          return done(err);
        }

        routes.__ResetDependency__('renderer');

        done();
      });

  });

});
