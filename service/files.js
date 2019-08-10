import FileModel from '../model/schema/files';
import { changeListToMongoID } from '../helpers/utils';

/** 增加 **/
export const createFile = async (data = {}) => {
  return await FileModel.create(data);
};

/** 删除 **/
export const deleteFileById = async (id) => {
  return await FileModel.deleteOne(id);
};

export const deleteFileBatchMap = async (idList) => {
  idList = changeListToMongoID(idList);
  return await FileModel.deleteMany(idList);
};

/** 修改 **/
export const updateFileById = async (id, data = {}) => {
  return await FileModel.findByIdAndUpdate(id, data);
};

export const updateFileBatchMap = async (idList, data = {}) => {
  idList = changeListToMongoID(idList);
  return await FileModel.updateMany({ _id: { $in: idList } }, data);
};

/** 查询 **/
export const getFileById = async id => {
  return await FileModel.findById(id);
};

export const getFileBatchMap = async (idList) => {
  idList = changeListToMongoID(idList);
  return await FileModel.find({ _id: { $in: idList } });
};

export const getFileList = async (conditions = {}, sort = {}, page = 1, pageSize = 20) => {
  return await FileModel.find(conditions).sort(sort).skip((page - 1) * pageSize).limit(pageSize);
};
