import * as Home from './controllers/home';
import * as News from './controllers/news';
import * as Recommend from './controllers/recommend';
import * as User from './controllers/user';

const wrap = fn => (...args) => Promise.resolve(fn(...args)).catch(args[2]);

export default app => {
  app.get('/', wrap(Home.renderHome));
  app.get('/news', wrap(News.renderNews));
  app.get('/recommend', wrap(Recommend.renderRecommend));
  app.get('/user', wrap(User.renderUser));
};
