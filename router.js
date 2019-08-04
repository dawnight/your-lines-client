import * as Home from './controllers/home';
import * as About from './controllers/about';
import * as Message from './controllers/message';
import * as Post from './controllers/post';
import * as TV from './controllers/tv';
import * as User from './controllers/user';

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

  /*** LOGIN PAGE ROUTER ***/
  app.get('/user/signUp', wrap(User.renderSignUp));
  app.get('/user/login', wrap(User.renderLogin));
  app.get('/user/logout', wrap(User.renderLogout));
  app.post('/user/signUp', wrap(User.signUp));
  app.post('/user/login', wrap(User.login));
  app.get('/user/center', wrap(User.renderUser));
};
