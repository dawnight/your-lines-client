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

app.use(ErrorHandle.handle404);
app.use(ErrorHandle.handle500);

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
