import qiniu from 'qiniu';
import { qiniuConfig } from '../config/constant';

class QiniuCloud {
  constructor(options) {
    this.options = options;

    let mac = new qiniu.auth.digest.Mac(options.AK, options.SK);

    this.putPolicy = new qiniu.rs.PutPolicy({
      scope: options.bucket,
      expires: 7200
    });

    this.uploadToken = this.putPolicy.uploadToken(mac);

    let config = new qiniu.conf.Config();

    this.bucketManager = new qiniu.rs.BucketManager(mac, config);

    this.formUploader = new qiniu.form_up.FormUploader(config);

    this.putExtra = new qiniu.form_up.PutExtra();
  }

  uploadToQiniu = (key, filePath) => {
    return new Promise((resolve, reject) => {
      this.formUploader.putFile(this.uploadToken, key, filePath, this.putExtra, (err, body, info) => {
        if (err) {
          console.log(err);
          reject(err);
        }

        if (info && info.statusCode === 200) {
          resolve(body);
        } else {
          reject(err);
        }
      });

    });
  };

  deleteOneFile = (key) => {
    return new Promise((resolve, reject) => {
      this.bucketManager.delete(this.options.bucket, key, (err, body, info) => {
        if (err) {
          console.log(err);
          reject(err);
        }

        if (info && info.statusCode === 200) {
          console.log(`删除 ${key} 成功`);
          resolve();
        } else {
          console.log(body);
          console.log(info);
          reject(err);
        }

      });
    });
  };

  deleteBatchFile = (list) => {
    let deleteOptions = list.map(item => {
      return qiniu.rs.deleteOp(this.options.bucket, item);
    });

    return new Promise((resolve, reject) => {
      this.bucketManager.batch(deleteOptions, (err, body, info) => {
        if (err) {
          console.log(err);
          reject(err);
        }

        if (info && info.statusCode === 200) {
          console.log(`批量删除成功`);
          resolve(info);
        } else {
          console.log(body);
          console.log(info);
          reject();
        }
      });
    });
  };

}

export default new QiniuCloud(qiniuConfig);
