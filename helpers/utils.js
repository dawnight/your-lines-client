import moment from 'moment';

export const formatDate = date => moment(date).format('YYYY-MM-DD');

export const formatTime = date => moment(date).format('YYYY-MM-DD HH:mm:ss');

export const mongoDBIdError = (ctx, msg = '缺少 id 参数或 id 参数不是标准的 MongoDB 格式') => {
  ctx.status = 400;
  return ctx.body = {
    msg
  };
};

export const paramsError = (ctx, msg) => {
  ctx.status = 400;
  return ctx.body = {
    msg
  };
};

export const randomString = () => Math.random().toString(32).slice(2).toUpperCase();

export const isPlainObject = obj => Object.prototype.toString.call(obj) === '[object Object]';

export const isEmptyObject = obj => isPlainObject(obj) && Object.keys(obj).length === 0;
