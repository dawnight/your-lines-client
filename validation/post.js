import { body } from 'express-validator';
import { UPLOAD_AREA_LIST, UPLOAD_LANGUAGE_LIST } from '../config/constant';

export const postLines = [
  body('originName').isLength({ min: 1 }).withMessage('原剧剧名不能为空'),
  body('nameCn').isLength({ min: 1 }).withMessage('中文剧名不能为空'),
  body('areaId').not().isIn(UPLOAD_AREA_LIST).withMessage('所在地区不符合要求'),
  body('linesLangId').not().isIn(UPLOAD_LANGUAGE_LIST).withMessage('剧中台词语言不符合要求'),
  body('linesText').isLength({ min: 1 }).withMessage('剧中台词不能为空'),
  body('transLangId').not().isIn(UPLOAD_LANGUAGE_LIST).withMessage('台词翻译语言不符合要求'),
  body('transText').isLength({ min: 1 }).withMessage('台词翻译不能为空'),
];
