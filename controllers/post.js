import path from 'path';
import fs from 'fs';
import uuid from 'uuid';
import formidable from 'formidable';

import FilesModel from '../model/schema/files';
import { UPLOAD_AREA_LIST, UPLOAD_LANGUAGE_LIST, PREFIX_URL } from '../config/constant';
import { navList, logoInfo } from './common';
import uploadToQiniu from '../helpers/qiniu';

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

  form.on('file', (field, file) => {
    allFile.push({ field, file });
  });

  form.parse(req, (err) => {
    if (err) {
      console.log(err);
    }

    allFile.forEach(async ({ field, file }) => {
      let fileId = uuid();

      let extName = path.extname(file.name);

      let fileName = fileId + extName;

      let filePath = `${form.uploadDir}/${fileName}`;

      fs.renameSync(file.path, filePath);

      let body = await uploadToQiniu(fileName, filePath);

      let newFile = {
        uploader: req.session.user.id,
        originPath: file.path,
        originName: file.name,
        originFiled: field,
        lastModifiedDate: file.lastModifiedDate,
        size: file.size,
        type: file.type,
        uuid: uuid(),
        hash: body.hash,
        key: body.key,
        url: `${PREFIX_URL}/${body.key}`
      };

      await FilesModel.create(newFile);
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

