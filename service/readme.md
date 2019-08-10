# service model

## 数据库的名字是 User

+ 增加
  + UserService.createUser(data)

+ 删除，只能通过 id 删除
  + UserService.deleteUser(id)
  + UserService.deleteUserBatchMap(idList)

+ 修改
  + UserService.updateUser(id, { name: 'jack' })
  + UserService.updateUserBatchMap(idList, { name: 'jack' })

+ 查询
  + UserService.getUserById(id)
  + UserService.getUserBatchMap(idList, sort, page, pageSize)
  + UserService.getUserList(conditions, sort, page, pageSize)

+ batchMap 方法只能通过 id 操作
