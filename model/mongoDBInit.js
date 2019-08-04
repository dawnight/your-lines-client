import mongoose from 'mongoose';
import path from 'path';
import chalk from 'chalk';
import glob from 'glob';
import bluebird from 'bluebird';
import env from '../env';

global.Promise = bluebird;

export const initSchema = () => {
  glob.sync(path.resolve(__dirname, './schema/', '**/*.js')).forEach(schema => {
    import(schema);
  });
};

export const connectDB = () => {
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoReconnect: true,
    poolSize: 10
  };

  if (env.mode === 'dev') {
    mongoose.set('debug', true);
  } else {
    mongoose.set('debug', false);
  }

  mongoose.connect(env.MONGODB_URL, options, err => {
    if (err) {
      console.log(chalk['red']('连接 MongoDB 数据库出错'));
      console.log(err);
    } else {
      console.log(chalk['green']('MongoDB 数据库连接成功'));
    }
  });

  mongoose.connection.on('error', error => {
    console.log(chalk['red']('MongoDB 数据库出错'));
    console.log(error);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB 数据库断开连接');
  });

  mongoose.connection.once('open', () => {
    console.log(chalk['green']('MongoDB 数据库已开启'));
  });

};
