import mongoose from 'mongoose';
import { COMMON_FIELDS } from './baseInfo';
import { searchFormalIdList, searchAreaIdList, searchLanguageIdList } from '../../config/constant';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const LinesSchema = new Schema({
  uploader: { type: ObjectId, ref: 'user', required: true },
  originName: { type:String, required: true },
  nameCn: { type:String, required: true },
  formalId: { type:String, required: true, enum: searchFormalIdList },
  areaId: { type:String, required: true, enum: searchAreaIdList },
  linesLangId: { type: String, required: true, enum: searchLanguageIdList },
  linesText: { type:String, required: true },
  transLangId: { type:String, required: true, enum: searchLanguageIdList },
  transText: { type:String, required: true },
  URLList: [{ type: String, default: '' }],
  ...COMMON_FIELDS
});

let LinesModel = mongoose.model('lines', LinesSchema);

export default LinesModel;
