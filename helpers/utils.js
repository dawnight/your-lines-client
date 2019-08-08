import moment from 'moment';
import os from 'os';

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

export const getIPAddress = () => {
  const interfaces = os.networkInterfaces();
  let ipList = [];
  for (let key in interfaces) {
    let iface = interfaces[key];
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i];
      if (alias.family === 'IPv4') {
        ipList.push(alias.address);
      }
    }
  }
  return ipList;
};
