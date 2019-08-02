import { navList, searchTypeList, logoInfo } from './common';

export const renderTv = (req, res) => {
  res.render('pages/tv', {
    navList,
    searchTypeList,
    logoInfo,
    page: 'tv'
  });
};
