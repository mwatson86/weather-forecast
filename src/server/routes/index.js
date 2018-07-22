
import { Router } from 'express';

import api from 'server/routes/api';

import renderer from 'server/middleware/renderer';

export default () => {
  const routes = Router();

  routes.use('/api', api());

  routes.get('/', renderer);

  return routes;
};
