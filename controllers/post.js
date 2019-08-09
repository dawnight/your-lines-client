import path from 'path';
import fs from 'fs';
import uuid from 'uuid';
import formidable from 'formidable';

import FilesModel from '../model/schema/files';
import LinesModel from '../model/schema/lines';
import { UPLOAD_AREA_MAP, UPLOAD_FORMAL_MAP, UPLOAD_LANGUAGE_MAP, PREFIX_URL } from '../config/constant';
import { navMap, logoInfo } from './common';
import uploadToQiniu from '../helpers/qiniu';

const uploadFormalMap = UPLOAD_FORMAL_MAP;
const uploadAreaMap = UPLOAD_AREA_MAP;
const uploadLanguageMap = UPLOAD_LANGUAGE_MAP;

const page = 'post';

export const renderPost = (req, res) => {

  res.render('post/index', {
    user: req.session.user,
    page,
    uploadFormalMap,
    uploadAreaMap,
    uploadLanguageMap,
    navMap,
    logoInfo,
    errors: req.flash('errors'),
  });
};

export const postLines = (req, res, next) => {

  let distPath = path.join(__dirname, '../uploads/');

  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath);
  }

  const form = new formidable.IncomingForm({
    encoding: 'utf-8',
    uploadDir: distPath,
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

  form.parse(req, async (err, fields) => {
    if (err) {
      console.log(err);
    }

    let fileURLList = [];

    let body = {};

    let len = allFile.length;

    if (len === 0) {
      return;
    }

    for (let i = 0; i < len; i++) {
      let { field, file } = allFile[i];

      if (file.size === 0) {
        return;
      }

      let fileId = uuid();

      let extName = path.extname(file.name);

      let fileName = fileId + extName;

      let filePath = `${form.uploadDir}/${fileName}`;

      fs.renameSync(file.path, filePath);

      try {
        body = await uploadToQiniu(fileName, filePath);
      } catch (e) {
        // TODO 记录上传失败时错误，并把错误记录，作为信息记录发送给用户
        console.log(e);
      } finally {

        if (body) {
          let newFile = {
            uploader: req.session.user.id,
            originPath: file.path,
            originName: file.name,
            originFiled: field,
            size: file.size,
            type: 'image',
            fullType: file.type,
            uuid: uuid(),
            hash: body.hash || '',
            key: body.key || '',
            url: body.hash ? `${PREFIX_URL}/${body.key}` : ''
          };

          await FilesModel.create(newFile);

          if (newFile.url) {
            fileURLList.push(newFile.url);
          }

          if (i === allFile.length - 1) {

            fields.URLList = fileURLList;

            fields.uploader = req.session.user.id;

            await LinesModel.create(fields);
          }
        }
      }
    }

  });

  form.on('error', err => {
    console.log('上传失败');
    console.log(err);
    next(err);
  });

  // TODO 这里返回的信息，不是真实的成功，而是表单提交成功
  // TODO 上传文件时可能会失败，所以应该要有校验，然后再返回
  form.on('end', function () {
    res.render('post/feedback', {
      user: req.session.user,
      page,
      message: '投稿成功',
      navMap
    });
  });

};

