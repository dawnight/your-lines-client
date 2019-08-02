import { navList, searchTypeList, logoInfo } from './common';

export const renderAbout = (req, res) => {
  res.render('pages/about', {
    navList,
    searchTypeList,
    logoInfo,
    page: 'about'
  });
};
