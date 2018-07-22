import path from 'path';

import express from 'express';

import bodyParser from 'body-parser';
import compression from 'compression';

import routes from 'server/routes';

let start = () => {

  let app = express();

  app.set('view engine', 'pug');

  app.use(compression());
  app.use('/public', express.static(path.resolve('package/client')));
  app.use(bodyParser.json());

  app.use('/', routes());

  let server = app.listen(3001, () => {
    console.log(`listening on port 3001`);
  });

  return server;

};

export default start;
