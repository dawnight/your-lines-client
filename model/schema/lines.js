import mongoose from 'mongoose';
import { COMMON_FIELDS } from './baseInfo';
import { UPLOAD_FORMAL_LIST, UPLOAD_AREA_LIST, UPLOAD_LANGUAGE_LIST } from '../../config/constant';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const LinesSchema = new Schema({
  uploader: { type: ObjectId, ref: 'user', required: true },
  originName: { type:String, required: true },
  nameCn: { type:String, required: true },
  formalId: { type:String, required: true, enum: UPLOAD_FORMAL_LIST },
  areaId: { type:String, required: true, enum: UPLOAD_AREA_LIST },
  linesLangId: { type: String, required: true, enum: UPLOAD_LANGUAGE_LIST },
  linesText: { type:String, required: true },
  transLangId: { type:String, required: true, enum: UPLOAD_LANGUAGE_LIST },
  transText: { type:String, required: true },
  URLList: [{ type: String, default: '' }],
  ...COMMON_FIELDS
});

let LinesModel = mongoose.model('lines', LinesSchema);

export default LinesModel;
