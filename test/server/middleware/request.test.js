
import { expect } from 'chai';
import sinon from 'sinon';

import makeRequest from 'server/middleware/request';

describe('server request middleware', () => {

  const mockLocation = 'MOCK_LOCATION';

  const mockRequest = {
    params: {
      location: mockLocation
    }
  };

  it('successful request', done => {

    const jsonStub = sinon.stub();

    const mockData = 'MOCK_DATA';

    const mockResponse = {
      json: jsonStub
    };

    makeRequest.__Rewire__('request', url => {
      expect(url).to.equal(`${process.env.OPEN_WEATHER_API}/data/2.5/forecast?q=${mockLocation},uk&units=imperial&appid=${process.env.OPEN_WEATHER_API_KEY}`)

      return Promise.resolve({
        body: mockData
      });
    });

    makeRequest(mockRequest, mockResponse)
      .then(() => {
        expect(jsonStub.calledOnce).to.be.true;
        expect(jsonStub.calledWith(mockData)).to.be.true;

        makeRequest.__ResetDependency__('request');

        done();
      });

  });

  it('failure request', done => {

    const mockError = 'FAKE_ERROR';

    const nextStub = sinon.stub();

    makeRequest.__Rewire__('request', url => {
      expect(url).to.equal(`${process.env.OPEN_WEATHER_API}/data/2.5/forecast?q=${mockLocation},uk&units=imperial&appid=${process.env.OPEN_WEATHER_API_KEY}`)

      return Promise.reject(mockError);
    });

    makeRequest(mockRequest, {}, nextStub).then(() => {
      expect(nextStub.calledOnce).to.be.true;
      expect(nextStub.calledWith(mockError)).to.be.true;

      makeRequest.__ResetDependency__('request');

      done();
    });

  });

});
