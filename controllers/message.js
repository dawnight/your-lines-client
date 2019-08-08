import { navList, logoInfo } from './common';

const page = 'message';

export const renderMessage = (req, res) => {
  res.render('message/index', {
    user: req.session.user,
    page,
    navList,
    logoInfo
  });
};
