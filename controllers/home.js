import * as LinesService from '../service/lines';
import * as FileService from '../service/files';
import * as UserService from '../service/user';
import { removeRepeatElement } from '../helpers/utils';

import {
  navList,
  logoInfo,
  searchFormalList,
  searchAreaList,
  searchHelperList,
} from '../config/constant';

const renderPage = 'home';

export const renderHome = async (req, res) => {
  let query = req.query;

  let { formalId = 'all', areaId = 'all', helperId = 'new', page = 1, pageSize = 2 } = query;

  page = Number(page);
  page = page >= 1 ? page : 1;
  pageSize = Number(pageSize);
  pageSize = pageSize >= 1 ? pageSize : 1;

  let params = {};

  if (formalId !== 'all') {
    params.formalId = formalId;
  }

  if (areaId !== 'all') {
    params.areaId = areaId;
  }

  let linesList = await LinesService.getLinesList(params, {}, page, pageSize);
  let linesCount = await LinesService.getLinesCount(params);

  let lastPage = linesCount % pageSize === 0 ? linesCount / pageSize : linesCount % pageSize + 1;

  let imageIdList = [];
  let uploaderIdList = [];

  linesList.forEach(lines => {
    lines.imageIdList.forEach(imageId => {
      imageIdList.push(imageId);
    });
    uploaderIdList.push(lines.uploaderId);
  });

  imageIdList = removeRepeatElement(imageIdList);
  uploaderIdList = removeRepeatElement(uploaderIdList);

  let fileList = await FileService.getFileBatchMap(imageIdList);
  let uploaderList = await UserService.getUserBatchMap(uploaderIdList);

  linesList.map(lines => {
    linesList.imageList = [];
    fileList.forEach(file => {
      if (lines.imageIdList.indexOf(file.id > -1)) {
        linesList.imageList.push(file.url);
      }
    });
    let uploader = uploaderList.find(u => u.id === lines.uploaderId);
    if (uploader) {
      lines.uploaderName = uploader.username;
    }
  });

  console.log('page: ', page);
  console.log('pageSize: ', pageSize);
  console.log('lastPage: ', lastPage);
  console.log('linesCount: ', linesCount);

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
    linesList,
    page,
    pageSize,
    linesCount,
    lastPage
  });
};
