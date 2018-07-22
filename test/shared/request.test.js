
import { expect } from 'chai';

import request from 'shared/request';

import nock from 'nock';

describe('request', () => {

  const fakeResponse = {
    success: {
      body: 'SUCCESS'
    },
    failure: 'FAILURE'
  }

  it('successful get request', done => {

    nock('http://localhost')
      .get('/api')
      .reply(200, fakeResponse.success);

    request('/api').then((res) => {
      expect(res.body).to.eql(fakeResponse.success);

      done();
    });

  });

  it('unsuccessful get request', done => {

    const fakeError = {
      message: fakeResponse.failure,
      code: 'FAKE_CODE'
    };

    nock('http://localhost')
      .get('/api')
      .replyWithError(fakeError);

      request('/api').catch((err) => {
        expect(err).to.eql(fakeError);

        done();
      });

  });

});
