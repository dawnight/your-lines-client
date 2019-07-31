import path from 'path';
import log4js from 'log4js';

import { formatDate } from './utils';

log4js.configure({
  appenders: {
    out: {
      type: 'console'
    },
    access: {
      type: 'file',
      filename: path.resolve(__dirname, `../logs/access.log-${formatDate()}.log`)
    }
  },
  categories: {
    default: {
      appenders: ['out'],
      level: 'info'
    },
    access: {
      appenders: ['access'],
      level: 'trace'
    }
  }
});

const logger = log4js.getLogger('access');

export default logger;
