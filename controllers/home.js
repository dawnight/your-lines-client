import { navMap, logoInfo } from './common';
import { SEARCH_FORMAL_MAP, SEARCH_AREA_MAP, SEARCH_HELPER_MAP } from '../config/constant';

const searchFormalMap = SEARCH_FORMAL_MAP;
const searchAreaMap = SEARCH_AREA_MAP;
const searchHelperMap = SEARCH_HELPER_MAP;

const page = 'home';

export const renderHome = (req, res) => {
  let query = req.query;
  const { formalId = 'all', areaId = 'all', helperId = 'new' } = query;

  res.render('home/index', {
    user: req.session.user,
    page,
    navMap,
    searchFormalMap,
    searchAreaMap,
    searchHelperMap,
    logoInfo,
    formalId,
    areaId,
    helperId
  });
};
