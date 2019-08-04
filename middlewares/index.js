import session from 'express-session';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import log4js from 'log4js';
import logger from '../helpers/logger';
import redisStore from 'connect-redis';

export default app => {
  app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms'
    ].join(' ');
  }));

  app.use(log4js.connectLogger(logger));

  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(bodyParser.json({
    limit: '20mb'
  }));

  let Store = redisStore(session);

  app.use(session({
    secret: 'session secret',
    name: 'your-lines-client',
    saveUninitialized: false,
    resave: false,
    httpOnly: true,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24
    },
    store: new Store()
  }));
};

