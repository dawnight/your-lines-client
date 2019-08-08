import { navList, logoInfo } from './common';
import { SEARCH_FORMAL_LIST, SEARCH_AREA_LIST, SEARCH_HELPER_LIST } from '../config/constant';

const searchFormalList = SEARCH_FORMAL_LIST;
const searchAreaList = SEARCH_AREA_LIST;
const searchHelperList = SEARCH_HELPER_LIST;

const page = 'home';

export const renderHome = (req, res) => {
  let query = req.query;
  const { formalId = 'all', areaId = 'all', helperId = 'new' } = query;

  res.render('home/index', {
    user: req.session.user,
    page,
    navList,
    searchFormalList,
    searchAreaList,
    searchHelperList,
    logoInfo,
    formalId,
    areaId,
    helperId
  });
};
