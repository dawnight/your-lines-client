import { navList, logoInfo } from './common';

export const renderAbout = (req, res) => {
  res.render('pages/about', {
    navList,
    logoInfo,
    page: 'about',
    user: req.session.user
  });
};
