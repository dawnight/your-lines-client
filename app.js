import path from 'path';
import express from 'express';
import middlewares from './middlewares';
import * as ErrorHandle from './middlewares/errorHandle';
import nunjucks from 'nunjucks';
import bluebird from 'bluebird';
import router from './router';
import { initSchema, connectDB } from './model/mongoDBInit';
import { getIPAddress } from './helpers/utils';

const app = express();
const PORT = 4200;

global.Promise = bluebird;

// app.all('*', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With');
//   res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
//   res.header('X-Powered-By', ' 3.2.1');
//   res.header('Content-Type', 'application/json;charset=utf-8');
//   next();
// });

app.use(ErrorHandle.handle404);
app.use(ErrorHandle.handle500);

middlewares(app);

app.set('view engine', 'njk');

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  noCache: true,
  IStripBlocks: true,
  trimBlocks: true
});

app.use(express.static(path.join(__dirname, 'dist')));

(async function () {
  await initSchema();
  await connectDB();
})();

router(app);

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    let ipList = getIPAddress();
    ipList.forEach(ip => {
      console.log(`server is running at http://${ip}:${PORT}`);
    });
  }
});
