import PersonModel from '../model/schema/person';

/** 增加 **/
export const createPerson = async (data = {}) => {
  return await PersonModel.create(data);
};

/** 删除 **/
// 返回的是操作后的结果
export const deletePersonById = async (id) => {
  return await PersonModel.deleteOne({ _id: id });
};

export const deletePersonBatchMap = async (idList) => {
  return await PersonModel.deleteMany(idList);
};

/** 修改 **/
export const updatePersonById = async (id, data = {}) => {
  return await PersonModel.updateOne({ _id: id }, data);
};

export const updatePersonBatchMap = async (idList, data = {}) => {
  return await PersonModel.updateMany({ _id: { $in: idList } }, data);
};

/** 查询 **/
export const getPersonById = async id => {
  return await PersonModel.findById(id);
};

export const getPersonBatchMap = async (idList) => {
  return await PersonModel.find({ _id: { $in: idList } });
};

export const getPersonList = async (conditions = {}, sort = {}, page = 1, pageSize = 20) => {
  return await PersonModel.find(conditions).sort(sort).skip((page - 1) * pageSize).limit(pageSize);
};
