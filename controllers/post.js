import { navList, searchTypeList, logoInfo } from './common';

export const renderPost = (req, res) => {
  res.render('pages/post', {
    navList,
    searchTypeList,
    logoInfo,
    page: 'post'
  });
};
