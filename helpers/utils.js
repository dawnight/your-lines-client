import moment from 'moment';
import validator from 'validator';
import mongoose from 'mongoose';
import os from 'os';

export const formatDate = date => moment(date).format('YYYY-MM-DD');

export const formatTime = date => moment(date).format('YYYY-MM-DD HH:mm:ss');

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

export const reduceListToObj = list => list.reduce((prev, curr) => {
  prev[curr.id] = curr.name;
  return prev;
}, {});

export const removeRepeatElement = list => Array.from(new Set(list));

export const changeStrToMongoID = str => mongoose.Types.ObjectId(str);

export const changeMongoIDToStr = id => mongoose.Types.ObjectId(id).toString();

export const changeListToMongoID = idList => {
  return idList.map(id => {
    if (!validator.isMongoId(id)) {
      id = changeStrToMongoID(id);
    }
    return id;
  });
};
