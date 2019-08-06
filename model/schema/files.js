import mongoose from 'mongoose';
import { COMMON_FIELDS } from './baseInfo';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const FilesSchema = new Schema({
  uploader: { type: ObjectId, ref: 'user', required: true },
  originPath: { type: String, required: true },
  originName: { type: String, required: true },
  originFiled: { type: String, required: true },
  lastModifiedDate: { type: Date, required: true },
  size: { type: Number, required: true },
  url: { type: String, default: '' },
  type: { type: String, required: true },
  uuid: { type: String, required: true },
  hash: { type: String, required: true },
  key: { type: String, required: true },
  ...COMMON_FIELDS
});

let FilesModel = mongoose.model('files', FilesSchema);

export default FilesModel;
