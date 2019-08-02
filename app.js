import path from 'path';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import nunjucks from 'nunjucks';
import bluebird from 'bluebird';
import morgan from 'morgan';
import log4js from 'log4js';
import logger from './helpers/logger';
import * as ErrorHandle from './middlewares/errorHandle';
import router from './router';

const app = express();
const PORT = 4200;

global.Promise = bluebird;

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

app.use(session({
  secret: 'session secret',
  name: 'line-session-name',
  resave: true,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.set('view engine', 'njk');

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  noCache: true,
  IStripBlocks: true,
  trimBlocks: true
});

app.use(express.static(path.join(__dirname, 'dist')));

router(app);

app.use(ErrorHandle.handle404);
app.use(ErrorHandle.handle500);

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server is running at http://localhost:${PORT}`);
  }
});
