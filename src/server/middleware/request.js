
import request from 'shared/request';

export default (req, res, next) => {
  const {
    OPEN_WEATHER_API,
    OPEN_WEATHER_API_KEY
  } = process.env;

  const {
    location
  } = req.params;

  return request(`${OPEN_WEATHER_API}/data/2.5/forecast?q=${location},uk&units=imperial&appid=${OPEN_WEATHER_API_KEY}`)
    .then(response => res.json(response.body))
    .catch(err => next(err));
};
