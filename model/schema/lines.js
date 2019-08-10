import mongoose from 'mongoose';
import { COMMON_FIELDS } from './baseInfo';
import {
  searchFormalIdList,
  searchAreaIdList,
  searchLanguageIdList,
  searchLanguageMap,
  searchAreaMap
} from '../../config/constant';
import { formatTime } from '../../helpers/utils';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const LinesSchema = new Schema({
  uploaderId: { type: ObjectId, ref: 'user', required: true },
  originName: { type: String, required: true },
  nameCn: { type: String, required: true },
  formalId: { type: String, required: true, enum: searchFormalIdList },
  areaId: { type: String, required: true, enum: searchAreaIdList },
  linesLangId: { type: String, required: true, enum: searchLanguageIdList },
  linesText: { type: String, required: true },
  transLangId: { type: String, required: true, enum: searchLanguageIdList },
  transText: { type: String, required: true },
  imageIdList: [{ type: String, default: '' }],
  ...COMMON_FIELDS
});

LinesSchema.set('toObject', { getters: true, virtuals: true });
LinesSchema.set('toJSON', { getters: true, virtuals: true });

LinesSchema.virtual('areaCn').get(function () {
  return searchAreaMap[this.areaId];
});

LinesSchema.virtual('linesLangCn').get(function () {
  return searchLanguageMap[this.linesLangId];
});

LinesSchema.virtual('transLangCn').get(function () {
  return searchLanguageMap[this.transLangId];
});

LinesSchema.methods.toJSON = function () {
  let result = this;
  result.createTime = formatTime(result.createTime);
  result.updateTime = formatTime(result.updateTime);
  result.id = ObjectId(result._id).toString();
  result.uploaderId = ObjectId(result.uploaderId).toString();
  delete result._id;
  delete result.__v;
  return result;
};

let LinesModel = mongoose.model('lines', LinesSchema);

export default LinesModel;
