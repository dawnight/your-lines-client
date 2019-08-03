import { navList, logoInfo } from './common';
import { SEARCH_AREA_LIST, LANGUAGE_LIST } from '../config';

const searchAreaList = SEARCH_AREA_LIST;
const languageList = LANGUAGE_LIST;

const formFields = [
  {
    id: 'nameCn',
    title: '中文剧名',
    hasInput: true,
    hasSelect: false,
    hasTextarea: false
  },
  {
    id: 'nameEn',
    title: '英文剧名',
    hasInput: true,
    hasSelect: false,
    hasTextarea: false
  },
  {
    id: 'area',
    title: '所在地区',
    hasInput: false,
    hasSelect: true,
    hasTextarea: false,
    style: {
      position: 'relative',
    },
    optionList: searchAreaList
  },
  {
    title: '剧中台词',
    hasInput: false,
    hasSelect: true,
    id: 'linesLangId',
    optionList: languageList,
    hasTextarea: true,
    textareaId: 'linesTextareaId'
  },
  {
    title: '台词翻译',
    hasInput: false,
    hasSelect: true,
    id: 'transLangId',
    optionList: languageList,
    hasTextarea: true,
    textareaId: 'transTextareaId'
  }
];

export const renderPost = (req, res) => {
  res.render('pages/post', {
    formFields,
    navList,
    logoInfo,
    page: 'post'
  });
};
