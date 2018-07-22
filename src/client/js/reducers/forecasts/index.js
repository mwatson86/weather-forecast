
import { combineReducers } from 'redux';
import moment from 'moment';

import request from 'client/js/reducers/forecasts/request';
import data from 'client/js/reducers/forecasts/data';

export const formatTemp = (temp) => `${temp}°F`;
export const formatSpeed = (speed) => `${speed}mph`;
export const formatConditions = (conditions) => conditions.join(', ');

export const getDate = (datetime, formatIn = 'YYYY-MM-DD h:mm:ss', formatOut = 'ddd Do') => moment(datetime, formatIn).format(formatOut);
export const getTime = (datetime, formatIn = 'YYYY-MM-DD h:mm:ss', formatOut = 'ha') => moment(datetime, formatIn).format(formatOut);

export const getMax = (slots, cb) => Math.max(...slots.map(cb));
export const getMin = (slots, cb) => Math.min(...slots.map(cb))

export const getConditions = slot => slot.weather.map(item => item.description.toLowerCase());

export const reduceConditions = slots => slots.reduce((accumulator, slot) => {
  const conditions = getConditions(slot).filter(condition => accumulator.indexOf(condition) === -1);

  return [
    ...accumulator,
    ...conditions
  ];
}, []);

export const groupForecastsByDay = forecast => forecast.reduce((accumulator, slot) => {
  const date = slot.dt_txt.split(' ')[0];

  accumulator[date] = accumulator[date] || [];

  accumulator[date] = [
    ...accumulator[date],
    { ...slot }
  ];

  return accumulator;
}, {});

export const getForecastByLocationName = (state) => {
  const { name } = state.location,
    forecast = state.forecasts.data[name];

  return forecast;
};

export const formatDayForecast = forecast => forecast.map(slot => ({
  formattedHour: getTime(slot.dt_txt),
  temp: {
    min: formatTemp(slot.main.temp_min),
    max: formatTemp(slot.main.temp_max)
  },
  conditions: formatConditions(getConditions(slot)),
  wind: formatSpeed(slot.wind.speed)
}));

export const getDayForecast = (state) => {
  const { day } = state.location;

  const forecast = getForecastByLocationName(state),
    groupedForecastsByDay = groupForecastsByDay(forecast);

  const dayForecast = groupedForecastsByDay[day];

  return {
    formattedDay: getDate(day, 'YYYY-MM-DD'),
    list: formatDayForecast(dayForecast),
  };
};

export const getWeekForecast = (state) => {
  const forecasts = getForecastByLocationName(state);

  if (!!forecasts) {
    const groupedForecasts = groupForecastsByDay(forecasts);

    return Object.keys(groupedForecasts).map(day => {
      const slots = groupedForecasts[day];

      return {
        day,
        formattedDay: getDate(day, 'YYYY-MM-DD'),
        temp: {
          min: formatTemp(getMin(slots, slot => slot.main.temp_min)),
          max: formatTemp(getMax(slots, slot => slot.main.temp_max))
        },
        conditions: formatConditions(reduceConditions(slots)),
        wind: {
          min: formatSpeed(getMin(slots, slot => slot.wind.speed)),
          max: formatSpeed(getMax(slots, slot => slot.wind.speed))
        }
      };
    });
  }

  return [];
};

export default combineReducers({
  request,
  data
});
