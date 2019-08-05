import path from 'path';
import formidable from 'formidable';
import { navList, logoInfo } from './common';
import { UPLOAD_AREA_LIST, UPLOAD_LANGUAGE_LIST } from '../config/constant';
import FilesModel from '../model/schema/files';

const uploadAreaList = UPLOAD_AREA_LIST;
const uploadLanguageList = UPLOAD_LANGUAGE_LIST;

export const renderPost = (req, res) => {
  res.render('pages/post', {
    uploadAreaList,
    uploadLanguageList,
    navList,
    logoInfo,
    page: 'post',
    user: req.session.user
  });
};

export const postLines = (req, res, next) => {

  const form = new formidable.IncomingForm({
    encoding: 'utf-8',
    uploadDir: path.join(__dirname, '../uploads/'),
    keepExtensions: true,
    maxFieldsSize: 2 * 1024 * 1024,
    multiples: true
  });

  let allFile = [];

  form.on('progress', (byteReceived, byteExpected) => {
    let progressInfo = {
      value: byteReceived,
      total: byteExpected
    };
    console.log('[progress]: ', JSON.stringify(progressInfo));
  });

  form.on('file', (filed, file) => {
    allFile.push({ filed, file });
  });

  form.parse(req, (err) => {
    if (err) {
      console.log(err);
    }

    allFile.forEach(async ({ filed, file }) => {
      let newFiles = {
        uploader: req.session.user.id,
        originPath: file.path,
        originName: file.name,
        originFiled: filed,
        lastModifiedDate: file.lastModifiedDate,
        size: file.size,
        url: '待定的 URL',
        type: file.type
      };
      console.log(newFiles);
      await FilesModel.create(newFiles);
    });
  });

  form.on('error', err => {
    console.log('上传失败');
    console.log(err);
    next(err);
  });

  form.on('end', function () {
    res.render('pages/postFeedback', {
      message: '投稿成功',
      page: 'post',
      navList,
      user: req.session.user
    });
  });

};

