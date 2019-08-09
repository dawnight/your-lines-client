import mongoose from 'mongoose';
import { COMMON_FIELDS } from './baseInfo';
import { FILE_TYPE_LIST } from '../../config/constant';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const FilesSchema = new Schema({
  uploader: { type: ObjectId, ref: 'user', required: true },
  originPath: { type: String, required: true },
  originName: { type: String, required: true },
  originFiled: { type: String, required: true },
  size: { type: Number, required: true },
  url: { type: String, default: '' },
  fullType: { type: String, default: '' },
  type: { type: String, default: '', enum: FILE_TYPE_LIST },
  uuid: { type: String, required: true },
  hash: { type: String, default: '' },
  key: { type: String, default: '' },
  ...COMMON_FIELDS
});

let FilesModel = mongoose.model('files', FilesSchema);

export default FilesModel;
