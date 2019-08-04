import { navList, logoInfo } from './common';
import { UPLOAD_AREA_LIST, UPLOAD_LANGUAGE_LIST } from '../config/constant';

const uploadAreaList = UPLOAD_AREA_LIST;
const uploadLanguageList = UPLOAD_LANGUAGE_LIST;

export const renderPost = (req, res) => {
  res.render('pages/post', {
    uploadAreaList,
    uploadLanguageList,
    navList,
    logoInfo,
    page: 'post',
    user: req.session.user
  });
};
