import UserModel from '../model/schema/user';

/** 增加 **/
export const createUser = async (data = {}) => {
  return await UserModel.create(data);
};

/** 删除 **/
export const deleteUserById = async (id) => {
  return await UserModel.deleteOne(id);
};

export const deleteUserBatchMap = async (idList) => {
  return await UserModel.deleteMany(idList);
};

/** 修改 **/
export const updateUserById = async (id, data = {}) => {
  return await UserModel.updateOne({ _id: id }, data);
};

export const updateUserBatchMap = async (idList, data = {}) => {
  return await UserModel.updateMany({ _id: { $in: idList } }, data);
};

/** 查询 **/
export const getUserById = async id => {
  return await UserModel.findById(id);
};

export const getOneUser = async (data = {}) => {
  return await UserModel.findOne(data);
};


export const getUserBatchMap = async (idList) => {
  return await UserModel.find({ _id: { $in: idList } });
};

export const getUserList = async (conditions = {}, sort = {}, page = 1, pageSize = 20) => {
  return await UserModel.find(conditions).sort(sort).skip((page - 1) * pageSize).limit(pageSize);
};
