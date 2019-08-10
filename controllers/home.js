import {
  navList,
  logoInfo,
  searchFormalList,
  searchAreaList,
  searchAreaMap,
  searchHelperList,
} from '../config/constant';
import LinesModel from '../model/schema/lines';

const renderPage = 'home';

export const renderHome = async (req, res) => {
  let query = req.query;

  let { formalId = 'all', areaId = 'all', helperId = 'new', page = 1, pageSize = 20 } = query;

  let params = {};

  if (formalId !== 'all') {
    params.formalId = formalId;
  }

  if (areaId !== 'all') {
    params.areaId = areaId;
  }

  let linesList = await LinesModel.find(params).sort({ createTime: -1 }).skip((page - 1) * pageSize).limit(pageSize);

  linesList = linesList.map(lines => {
    lines.areaCn = searchAreaMap[lines.areaId];
    return lines;
  });

  res.render('home/index', {
    user: req.session.user,
    renderPage,
    navList,
    searchFormalList,
    searchAreaList,
    searchHelperList,
    logoInfo,
    formalId,
    areaId,
    helperId,
    linesList
  });
};
