import mongoose from 'mongoose';
import { COMMON_FIELDS } from './baseInfo';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const LinesSchema = new Schema({
  uploader: { type: ObjectId, ref: 'user', required: true },
  nameOrigin: { type:String, required: true },
  nameCn: { type:String, required: true },
  areaId: { type:String, required: true },
  linesLangId: { type: String, required: true },
  linesText: { type:String, required: true },
  transLangId: { type:String, required: true },
  transText: { type:String, required: true },
  imageList: [ObjectId],
  ...COMMON_FIELDS
});

let LinesModel = mongoose.model('lines', LinesSchema);

export default LinesModel;
