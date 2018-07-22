
import { expect } from 'chai';
import nock from 'nock';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import fetchForecast, * as forecastActions from 'client/js/actions/forecast-actions';

import actionType from 'client/js/utils/action-types';

const mockStore = configureMockStore([thunk]);

describe('forecast actions', () => {

  const mockLocation = 'MOCK_LOCATION';

  context('action creators', () => {

    it('request forecast', () => {

      const result = forecastActions.requestForecast();

      expect(result).to.eql({
        type: actionType.REQUEST_FORECAST
      });

    });

    it('error requesting forecast', () => {

      const result = forecastActions.errorRequestingForecast()

      expect(result).to.eql({
        type: actionType.ERROR_REQUESTING_FORECAST
      });

    });

    it('set forecast', () => {

      const mockData = 'MOCK_DATA';

      const result = forecastActions.setForecast(mockLocation, mockData);

      expect(result).to.eql({
        type: actionType.SET_FORECAST,
        location: mockLocation,
        data: mockData
      });

    });

  });

  context('default thunk action', () => {

    it('loading', done => {

      const store = mockStore({
        forecasts: {
          data: {},
          request: {
            loading: true
          }
        }
      });

      store.dispatch(fetchForecast(mockLocation))
        .then(() => {
          expect(store.getActions()).to.eql([]);

          done();
        });

    });

    it('data exists for location', done => {

      const store = mockStore({
        forecasts: {
          data: {
            [mockLocation]: {
              fake: 'data'
            }
          },
          request: {
            loading: false
          }
        }
      });

      store.dispatch(fetchForecast(mockLocation))
        .then(() => {
          expect(store.getActions()).to.eql([]);

          done();
        });

    });

    it('successful request', done => {

      const mockList = 'MOCK_LIST';

      const mockResponse = {
        list: mockList
      };

      const expectedActions = [
        { type: actionType.REQUEST_FORECAST },
        { type: actionType.SET_FORECAST, location: mockLocation, data: mockList }
      ];

      let store = mockStore({
        forecasts: {
          request: {
            loading: false,
          },
          data: {}
        }
      });

      nock('http://localhost')
        .get(`/api/forecast/${mockLocation}`)
        .reply(200, mockResponse);

      store.dispatch(fetchForecast(mockLocation))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);

          done();
        });

    });

    it('request error', done => {

      const mockError = 'MOCK_ERROR';

      const expectedActions = [
        { type: actionType.REQUEST_FORECAST },
        { type: actionType.ERROR_REQUESTING_FORECAST }
      ];

      let store = mockStore({
        forecasts: {
          request: {
            loading: false,
          },
          data: {}
        }
      });

      nock('http://localhost')
        .get(`/api/forecast/${mockLocation}`)
        .replyWithError(mockError);

      store.dispatch(fetchForecast(mockLocation))
        .catch(err => {
          expect(err).to.equal('There was a problem, please try again');

          expect(store.getActions()).to.eql(expectedActions);

          done();
        });

    });

  });

});
