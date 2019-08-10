import LinesModel from '../model/schema/lines';
import { changeListToMongoID } from '../helpers/utils';
/** 增加 **/
export const createLines = async (data = {}) => {
  console.log('createLines');
  console.log(data);
  return await LinesModel.create(data);
};

/** 删除 **/
export const deleteLinesById = async (id) => {
  return await LinesModel.findByIdAndDelete(id);
};

export const deleteLinesBatchMap = async (idList) => {
  idList = changeListToMongoID(idList);
  return await LinesModel.deleteMany(idList);
};

/** 修改 **/
export const updateLinesById = async (id, data = {}) => {
  return await LinesModel.findByIdAndUpdate(id, data);
};

export const updateLinesBatchMap = async (idList, data = {}) => {
  idList = changeListToMongoID(idList);
  return await LinesModel.updateMany({ _id: { $in: idList } }, data);
};

/** 查询 **/
export const getLinesById = async id => {
  return await LinesModel.findById(id);
};

export const getLinesBatchMap = async (idList) => {
  idList = changeListToMongoID(idList);
  return await LinesModel.find({ _id: { $in: idList } });
};

export const getLinesList = async (conditions = {}, sort = {}, page = 1, pageSize = 20) => {
  return await LinesModel.find(conditions).sort(sort).skip((page - 1) * pageSize).limit(pageSize);
};

/** 查询并修改 **/


