import mongoose from 'mongoose';
import { COMMON_FIELDS } from './baseInfo';
import { formatTime } from '../../helpers/utils';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const TagsSchema = new Schema({
  type: { type:String, required: true },
  name: { type:String, required: true },
  nameEn: { type:String, required: true },
  ...COMMON_FIELDS
});


TagsSchema.methods.toJSON = function () {
  let result = this.toObject();
  result.createTime = formatTime(result.createTime);
  result.updateTime = formatTime(result.updateTime);
  result.id = ObjectId(result._id).toString();
  delete result._id;
  delete result.__v;
  return result;
};

let TagsModel = mongoose.model('tags', TagsSchema);

export default TagsModel;

/*
* type 由我们自己定义类型，比如首页的形式和地区
* 对于形式类型，在数据库中就可以这么显示
* { type: 'formal', name: '电影', nameEn: 'movie' }
* 对于地区类型，在数据库中就可以这么显示
* { type: 'area', name: '中国大陆', nameEn: 'mainland' }
* 对于语言类型，在数据库中国就可以这么定义
* { type: 'language', name: '汉语', nameEn: 'English' }
* */
