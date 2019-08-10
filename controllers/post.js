import path from 'path';
import fs from 'fs';
import uuid from 'uuid';
import formidable from 'formidable';
import validator from 'validator';

import FilesModel from '../model/schema/files';
import LinesModel from '../model/schema/lines';

import QiniuCloud from '../helpers/qiniu';

import {
  uploadAreaList,
  uploadFormalList,
  uploadLanguageList,
  navList,
  logoInfo,
  PREFIX_URL } from '../config/constant';

import { CODE_OK, CODE_ERROR } from '../config/basic';

const page = 'post';

export const renderPost = (req, res) => {

  res.render('post/index', {
    user: req.session.user,
    page,
    navList,
    logoInfo,
    uploadAreaList,
    uploadFormalList,
    uploadLanguageList,
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
        // body = await uploadToQiniu(fileName, filePath);
        body = await QiniuCloud.uploadToQiniu(fileName, filePath);
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
            inQiniu: true,
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
      navList
    });
  });

};

export const deleteBatchMap = async (req, res) => {

  let fileList = await FilesModel.find({ inQiniu: true });

  if (fileList.length === 0) {
    return res.json({
      status: CODE_ERROR,
      msg: '没有数据'
    });
  }

  let ids = [];

  let keyList = [];

  fileList.map(item => {

    ids.push(item._id);

    keyList.push(item.key);

  });

  await QiniuCloud.deleteBatchFile(keyList);

  await FilesModel.updateMany({ _id: { $in: ids } }, { inQiniu: false });

  return res.json({
    status: CODE_OK,
    msg: '批量删除成功'
  });
};

export const deleteOne = async (req, res) => {

  let id = req.body.id;

  if (!validator.isMongoId(id)) {
    return res.json({
      status: CODE_ERROR,
      msg: 'id 错误，不是标准的 Mongo ID'
    });
  }

  try {
    let file = await FilesModel.findOne({ _id: id });

    if (file) {

      await QiniuCloud.deleteOneFile(file.key);

      await FilesModel.updateOne({ _id: id }, { inQiniu: false });

      return res.json({
        status: CODE_OK,
        msg: '删除成功'
      });
    }

    return res.json({
      status: CODE_ERROR,
      msg: '没有找到该文件'
    });

  } catch (err) {

    console.log(err);

    return res.json({
      status: CODE_ERROR,
      msg: '服务错误'
    });
  }
};

