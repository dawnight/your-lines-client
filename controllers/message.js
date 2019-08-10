import { navList, logoInfo } from '../config/constant';

const page = 'message';

export const renderMessage = (req, res) => {
  res.render('message/index', {
    user: req.session.user,
    page,
    navList,
    logoInfo
  });
};
