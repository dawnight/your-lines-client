import { navList, searchTypeList, logoInfo } from './common';

export const renderHome = (req, res) => {
  res.render('pages/index', {
    navList,
    searchTypeList,
    logoInfo
  });
};
