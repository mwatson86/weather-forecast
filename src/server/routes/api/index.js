
import { Router } from 'express';

import makeRequest from 'server/middleware/request';

export default () => {
  const api = Router();

  api.get('/forecast/:location', makeRequest);

  return api;
};
