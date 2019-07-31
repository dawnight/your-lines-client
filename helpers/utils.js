import moment from 'moment';

export const formatDate = (date = new Date(), needTime = false) => {
  date = new Date(date);
  if (needTime) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  } else {
    return moment(date).format('YYYY-MM-DD');
  }
};
