import mongoose from 'mongoose';
import { COMMON_FIELDS } from './baseInfo';

const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  name: String,
  age: Number,
  sex: String,
  work: String,
  ...COMMON_FIELDS
});

let PersonModel = mongoose.model('person', PersonSchema);

export default PersonModel;
