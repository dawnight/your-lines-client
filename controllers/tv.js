import { navList, logoInfo } from './common';

export const renderTv = (req, res) => {
  res.render('pages/tv', {
    navList,
    logoInfo,
    page: 'tv',
    user: req.session.user
  });
};
