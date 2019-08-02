import { navList, searchTypeList, logoInfo } from './common';

export const renderMessage = (req, res) => {
  res.render('pages/message', {
    navList,
    searchTypeList,
    logoInfo,
    page: 'message'
  });
};
