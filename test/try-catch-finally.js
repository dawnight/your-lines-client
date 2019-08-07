try {
  throw new Error('测试错误信息');
} catch (e) {
  console.log(e);
} finally {
  console.log('最终执行的代码');
}
