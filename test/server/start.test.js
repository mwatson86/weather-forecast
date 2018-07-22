
import request from 'supertest';

import start from 'server/start';

describe('start server', () => {

  let server;

  beforeEach(() => {
    server = start();
  });

  afterEach((done) => {
    server.close(done);
  });

  it('routes', (done) => {
    request(server)
      .get('/')
      .expect(200, done);
  });

});
