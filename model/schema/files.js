import mongoose from 'mongoose';
import { COMMON_FIELDS } from './baseInfo';
import { fileTypeIdList, PREFIX_URL } from '../../config/constant';
import { formatTime } from '../../helpers/utils';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const FilesSchema = new Schema({
  uploaderId: { type: ObjectId, ref: 'user', required: true },
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
  ...COMMON_FIELDS
});

FilesSchema.set('toObject', { getters: true, virtuals: true });
FilesSchema.set('toJSON', { getters: true, virtuals: true });

FilesSchema.virtual('url').get(function () {
  return PREFIX_URL + this.key;
});

FilesSchema.methods.toJSON = function () {
  let result = this;
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
