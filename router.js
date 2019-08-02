import * as Home from './controllers/home';
import * as About from './controllers/about';
import * as Message from './controllers/message';
import * as Post from './controllers/post';
import * as TV from './controllers/tv';

const wrap = fn => (...args) => Promise.resolve(fn(...args)).catch(args[2]);

export default app => {
  /*** HOME PAGE ROUTER ***/
  app.get('/', wrap(Home.renderHome));

  /*** ABOUT PAGE ROUTER ***/
  app.get('/about', wrap(About.renderAbout));

  /*** MESSAGE PAGE ROUTER ***/
  app.get('/message', wrap(Message.renderMessage));

  /*** POST PAGE ROUTER ***/
  app.get('/post', wrap(Post.renderPost));

  /*** TV PAGE ROUTER ***/
  app.get('/tv', wrap(TV.renderTv));
};
