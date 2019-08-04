import { navList, logoInfo } from './common';
import { SEARCH_TYPE_LIST, SEARCH_AREA_LIST, SEARCH_HELPER_LIST } from '../config/constant';

const searchTypeList = SEARCH_TYPE_LIST;
const searchAreaList = SEARCH_AREA_LIST;
const searchHelperList = SEARCH_HELPER_LIST;

export const renderHome = (req, res) => {
  let query = req.query;
  const { typeId = 'all', areaId = 'all', helperId = 'new' } = query;

  res.render('pages/home', {
    page: 'home',
    navList,
    searchTypeList,
    searchAreaList,
    searchHelperList,
    logoInfo,
    typeId,
    areaId,
    helperId,
    user: req.session.user
  });
};
