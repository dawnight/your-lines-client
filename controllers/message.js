import { navList, logoInfo } from './common';

export const renderMessage = (req, res) => {
  res.render('pages/message', {
    navList,
    logoInfo,
    page: 'message',
    user: req.session.user
  });
};
