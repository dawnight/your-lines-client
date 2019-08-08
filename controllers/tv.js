import { navList, logoInfo } from './common';

const page = 'tv';

export const renderTv = (req, res) => {
  res.render('tv/index', {
    user: req.session.user,
    page,
    navList,
    logoInfo
  });
};
