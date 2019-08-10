import mongoose from 'mongoose';
import { COMMON_FIELDS } from './baseInfo';
import { fileTypeIdList, PREFIX_URL } from '../../config/constant';
import { formatTime, changeMongoIDToStr } from '../../helpers/utils';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const FilesSchema = new Schema({
  _uploaderId: {
    type: ObjectId, ref: 'user', required: true },
  inQiniu: { type: Boolean, default: false },
  originPath: { type: String, required: true },
  originName: { type: String, required: true },
  originFiled: { type: String, required: true },
  size: { type: Number, required: true },
  fullType: { type: String, default: '' },
  type: { type: String, default: '', enum: fileTypeIdList },
  uuid: { type: String, required: true },
  hash: { type: String, default: '' },
  key: { type: String, default: '' },
  // priority 是图片显示的优先级，数值越大，顺序越靠前
  priority: { type: Number, default: 0 },
  ...COMMON_FIELDS
});

FilesSchema.set('toObject', { getters: true, virtuals: true });
FilesSchema.set('toJSON', { getters: true, virtuals: true });

FilesSchema.virtual('url').get(function () {
  return PREFIX_URL + this.key;
});

FilesSchema.virtual('uploaderId').get(function () {
  return changeMongoIDToStr(this._uploaderId);
});

FilesSchema.methods.toJSON = function () {
  let result = this.toObject();
  result.createTime = formatTime(result.createTime);
  result.updateTime = formatTime(result.updateTime);
  result.id = ObjectId(result._id).toString();
  result.uploaderId = ObjectId(result.uploaderId).toString();
  delete result._id;
  delete result.__v;
  return result;
};

let FilesModel = mongoose.model('files', FilesSchema);

export default FilesModel;
