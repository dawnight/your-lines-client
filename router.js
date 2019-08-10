import * as Home from './controllers/home';
import * as About from './controllers/about';
import * as Message from './controllers/message';
import * as Post from './controllers/post';
import * as TV from './controllers/tv';
import * as User from './controllers/user';
import * as Person from './controllers/person';
import auth from './middlewares/auth';
import * as UserValidator from './validation/user';

const wrap = fn => (...args) => Promise.resolve(fn(...args)).catch(args[2]);

export default app => {
  /*** HOME PAGE ROUTER ***/
  app.get('/', wrap(Home.renderHome));

  /*** ABOUT PAGE ROUTER ***/
  app.get('/about', wrap(About.renderAbout));

  /*** MESSAGE PAGE ROUTER ***/
  app.get('/message', wrap(Message.renderMessage));

  /*** POST PAGE ROUTER ***/
  app.get('/post', auth, wrap(Post.renderPost));
  app.post('/post/lines', auth, Post.postLines);
  app.get('/post/:id/get', auth, Post.getLinesById);
  app.post('/post/lines/deleteBatchMap', auth, Post.deleteBatchMap);
  app.post('/post/lines/:id/deleteFile', auth, Post.deleteOneFile);
  app.post('/post/lines/:id/deleteLines', auth, Post.deleteOneLines);

  /*** TV PAGE ROUTER ***/
  app.get('/tv', wrap(TV.renderTv));

  /*** LOGIN PAGE ROUTER ***/
  app.get('/user/signUp', wrap(User.renderSignUp));
  app.get('/user/login', wrap(User.renderLogin));
  app.get('/user/logout', wrap(User.renderLogout));
  app.post('/user/signUp', UserValidator.signUp, wrap(User.signUp));
  app.post('/user/login', UserValidator.login, wrap(User.login));
  app.get('/user/center', auth, wrap(User.renderUser));

  /*** PERSON PAGE ROUTER ***/
  app.post('/person/create', Person.create);
  app.post('/person/deleteOne', Person.deleteOne);
  app.post('/person/deleteMany', Person.deleteMany);
  app.get('/person/find', Person.find);
  app.get('/person/findById', Person.findById);
  app.post('/person/findByIdAndUpdate', Person.findByIdAndUpdate);
  app.post('/person/findByIdAndDelete', Person.findByIdAndDelete);
  app.get('/person/findOne', Person.findOne);
  app.post('/person/findOneAndUpdate', Person.findOneAndUpdate);
  app.post('/person/findOneAndDelete', Person.findOneAndDelete);
};
