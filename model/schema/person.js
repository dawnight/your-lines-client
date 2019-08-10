import mongoose from 'mongoose';
import { COMMON_FIELDS } from './baseInfo';
import { formatTime } from '../../helpers/utils';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const PersonSchema = new Schema({
  name: String,
  age: Number,
  sex: String,
  work: String,
  ...COMMON_FIELDS
});

PersonSchema.set('toObject', { getters: true, virtuals: true });
PersonSchema.set('toJSON', { getters: true, virtuals: true });

PersonSchema.methods.toJSON = function () {
  let result = this;
  result.createTime = formatTime(result.createTime);
  result.updateTime = formatTime(result.updateTime);
  result.id = ObjectId(result._id).toString();
  result.uploaderId = ObjectId(result.uploaderId).toString();
  delete result._id;
  delete result.__v;
  return result;
};

let PersonModel = mongoose.model('person', PersonSchema);

export default PersonModel;
