// import express from 'express';
import * as Home from './controllers/home';

// const router = express.Router();

const wrap = fn => (...args) => Promise.resolve(fn(...args)).catch(args[2]);

export default app => {
  app.get('/', wrap(Home.renderHome));
};
