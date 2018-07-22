
import { expect } from 'chai';
import sinon from 'sinon';

import forecastsReducer, * as forecastsNamedExport from 'client/js/reducers/forecasts';

import actionType from 'client/js/utils/action-types';

describe('forecasts reducer', () => {

  const mockDate = 'MOCK_DATE',
    mockFormattedDate = `FORMATTED_${mockDate}`;

  const mockTime = 'MOCK_TIME',
    mockFormattedTime = `FORMATTED_${mockTime}`;

  const mockName = 'MOCK_NAME';
  const mockCondition = 'MOCK_CONDITION';

  const mockMinTemp = 5,
    mockMaxTemp = 10;

  const mockMinSpeed = 6,
    mockMaxSpeed = 12;

  it('combine reducers', () => {

    const result = forecastsReducer();

    expect(result).to.have.all.keys('request', 'data');

  });

  it('format temp', () => {

    const result = forecastsNamedExport.formatTemp(mockMinTemp);

    expect(result).to.equal(`${mockMinTemp}°F`);

  });

  it('format speed', () => {

    const result = forecastsNamedExport.formatSpeed(mockMaxSpeed);

    expect(result).to.equal(`${mockMaxSpeed}mph`);

  });

  it('format conditions', () => {

    const mockConditions = [`${mockCondition}_1`, `${mockCondition}_2`];

    const result = forecastsNamedExport.formatConditions(mockConditions);

    expect(result).to.equal(mockConditions.join(', '));

  });

  it('get date', () => {

    const mockDateTime = `${mockDate} ${mockTime}`,
      mockFormattedDate = 'MOCK_FORMATTED_DATE';

    const formatStub = sinon.stub().returns(mockFormattedDate);
    const momentStub = sinon.stub().returns({
      format: formatStub
    });

    forecastsReducer.__Rewire__('moment', momentStub);

    const result = forecastsNamedExport.getDate(mockDateTime);

    expect(momentStub.withArgs(mockDateTime, 'YYYY-MM-DD h:mm:ss').calledOnce).to.be.true;
    expect(formatStub.withArgs('ddd Do').calledOnce).to.be.true;

    expect(result).to.equal(mockFormattedDate);

    forecastsReducer.__ResetDependency__('moment');

  });

  it('get time', () => {

    const mockDateTime = `${mockDate} ${mockTime}`,
      mockFormattedTime = 'MOCK_FORMATTED_TIME';

    const formatStub = sinon.stub().returns(mockFormattedTime);
    const momentStub = sinon.stub().returns({
      format: formatStub
    });

    forecastsReducer.__Rewire__('moment', momentStub);

    const result = forecastsNamedExport.getTime(mockDateTime);

    expect(momentStub.withArgs(mockDateTime, 'YYYY-MM-DD h:mm:ss').calledOnce).to.be.true;
    expect(formatStub.withArgs('ha').calledOnce).to.be.true;

    expect(result).to.equal(mockFormattedTime);

    forecastsReducer.__ResetDependency__('moment');

  });

  it('get min', () => {

    const mockMinValue = 2;

    const slots = [12, 10, mockMinValue, 8, 4];

    const result = forecastsNamedExport.getMin(slots, slot => slot);

    expect(result).to.equal(mockMinValue);

  });

  it('get max', () => {

    const mockMaxValue = 12;

    const slots = [mockMaxValue, 10, 2, 8, 4];

    const result = forecastsNamedExport.getMax(slots, slot => slot);

    expect(result).to.equal(mockMaxValue);

  });

  it('get conditions', () => {

    const mockConditions = {
      weather: [
        { description: `${mockCondition}_1` },
        { description: `${mockCondition}_2` }
      ]
    };

    const result = forecastsNamedExport.getConditions(mockConditions);

    expect(result).to.eql([
      `${mockCondition}_1`.toLowerCase(),
      `${mockCondition}_2`.toLowerCase()
    ]);

  });

  it('reduce conditions', () => {

    const mockConditions = [
      {
        weather: [
          { description: `${mockCondition}_1` }
        ]
      },
      {
        weather: [
          { description: `${mockCondition}_1` },
          { description: `${mockCondition}_2` }
        ]
      }
    ];

    const result = forecastsNamedExport.reduceConditions(mockConditions);

    expect(result).to.eql([
      `${mockCondition}_1`.toLowerCase(),
      `${mockCondition}_2`.toLowerCase()
    ])

  });

  it('group forecasts by day', () => {

    const mockForecast = [
      { dt_txt: `${mockDate}_1 ${mockTime}` },
      { dt_txt: `${mockDate}_1 ${mockTime}` },
      { dt_txt: `${mockDate}_2 ${mockTime}` }
    ];

    const result = forecastsNamedExport.groupForecastsByDay(mockForecast);

    expect(result).to.eql({
      [`${mockDate}_1`]: [
        mockForecast[0],
        mockForecast[1]
      ],
      [`${mockDate}_2`]: [
        mockForecast[2]
      ]
    });

  });

  context('get forecasts by location name', () => {

    it('truthy', () => {

      const mockForecast = 'MOCK_FORECAST';

      const mockState = {
        location: {
          name: mockName
        },
        forecasts: {
          data: {
            [mockName]: mockForecast
          }
        }
      };

      const result = forecastsNamedExport.getForecastByLocationName(mockState);

      expect(result).to.equal(mockForecast);

    });

    it('falsy', () => {

      const mockState = {
        location: {
          name: mockName
        },
        forecasts: {
          data: {}
        }
      };

      const result = forecastsNamedExport.getForecastByLocationName(mockState);

      expect(result).to.be.undefined;

    });

  });

  it('format day forecast', () => {

    const mockForecast = [{
      dt_txt: `${mockDate} ${mockTime}`,
      main: {
        temp_min: mockMinTemp,
        temp_max: mockMaxTemp
      },
      weather: [
        { description: `${mockCondition}_1` },
        { description: `${mockCondition}_2` }
      ],
      wind: {
        speed: mockMaxSpeed
      }
    }];

    forecastsReducer.__Rewire__('moment', (datetime, format) => {
      expect(datetime).to.equal(`${mockDate} ${mockTime}`);
      expect(format).to.equal('YYYY-MM-DD h:mm:ss');

      return {
        format(format) {
          expect(format).to.equal('ha');

          return mockTime;
        }
      };
    });

    const result = forecastsNamedExport.formatDayForecast(mockForecast);

    expect(result).to.eql([{
      formattedHour: mockTime,
      temp: {
        min: `${mockMinTemp}°F`,
        max: `${mockMaxTemp}°F`
      },
      conditions: (`${mockCondition}_1, ${mockCondition}_2`).toLowerCase(),
      wind: `${mockMaxSpeed}mph`
    }]);

    forecastsReducer.__ResetDependency__('moment');

  });

  it('get day forecast', () => {

    const mockForecast = [{
      dt_txt: `${mockDate} ${mockTime}`,
      main: {
        temp_min: mockMinTemp,
        temp_max: mockMaxTemp
      },
      weather: [
        { description: `${mockCondition}_1` },
        { description: `${mockCondition}_2` }
      ],
      wind: {
        speed: mockMaxSpeed
      }
    }];

    const mockState = {
      location: {
        name: mockName,
        day: mockDate
      },
      forecasts: {
        data: {
          [mockName]: mockForecast
        }
      }
    };

    const momentStub = sinon.stub();

    momentStub.withArgs(mockDate, 'YYYY-MM-DD')
      .returns({
        format(format) {
          expect(format).to.equal('ddd Do');

          return mockFormattedDate;
        }
      });

    momentStub.withArgs(`${mockDate} ${mockTime}`, 'YYYY-MM-DD h:mm:ss')
      .returns({
        format(format) {
          expect(format).to.equal('ha');

          return mockFormattedTime;
        }
      });

    forecastsReducer.__Rewire__('moment', momentStub);

    const result = forecastsNamedExport.getDayForecast(mockState);

    expect(result).to.eql({
      formattedDay: mockFormattedDate,
      list: [{
        formattedHour: mockFormattedTime,
        temp: {
          min: `${mockMinTemp}°F`,
          max: `${mockMaxTemp}°F`
        },
        conditions: (`${mockCondition}_1, ${mockCondition}_2`).toLowerCase(),
        wind: `${mockMaxSpeed}mph`
      }]
    });

    forecastsReducer.__ResetDependency__('moment');

  });

  context('get week forecast', () => {

    it('forecast does not exist', () => {

      const mockState = {
        location: {
          name: mockName
        },
        forecasts: {
          data: {}
        }
      };

      const result = forecastsNamedExport.getWeekForecast(mockState);

      expect(result).to.eql([]);

    });

    it('forecast does exist', () => {

      const mockForecast = [
        {
          dt_txt: `${mockDate} ${mockTime}`,
          main: {
            temp_min: mockMinTemp,
            temp_max: 8
          },
          weather: [
            { description: `${mockCondition}_1` },
          ],
          wind: {
            speed: mockMinSpeed
          }
        },
        {
          dt_txt: `${mockDate} ${mockTime}`,
          main: {
            temp_min: 7,
            temp_max: mockMaxTemp
          },
          weather: [
            { description: `${mockCondition}_1` },
            { description: `${mockCondition}_2` }
          ],
          wind: {
            speed: mockMaxSpeed
          }
        }
      ];

      const mockState = {
        location: {
          name: mockName
        },
        forecasts: {
          data: {
            [mockName]: mockForecast
          }
        }
      };

      forecastsReducer.__Rewire__('moment', (datetime, format) => {
        expect(datetime).to.equal(mockDate);
        expect(format).to.equal('YYYY-MM-DD');

        return {
          format(format) {
            expect(format).to.equal('ddd Do');

            return mockFormattedDate;
          }
        };
      });

      const result = forecastsNamedExport.getWeekForecast(mockState);

      expect(result).to.eql([{
        day: mockDate,
        formattedDay: mockFormattedDate,
        temp: {
          min: `${mockMinTemp}°F`,
          max: `${mockMaxTemp}°F`
        },
        conditions: (`${mockCondition}_1, ${mockCondition}_2`).toLowerCase(),
        wind: {
          min: `${mockMinSpeed}mph`,
          max: `${mockMaxSpeed}mph`
        }
      }]);

    });

  });

});
