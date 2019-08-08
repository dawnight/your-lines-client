export const handle404 = (req, res) => {
  res.render('exception/index', {
    title: '404',
    errorTitle: '抱歉！你访问的页面失联了',
    errorMsg: [
      '网址已失效 - 可能页面已删除。'
    ]
  });
};

export const handle500 = (err, req, res) => {
  res.render('exception/index', {
      title: '500',
      errorTitle: '抱歉！当前页面暂时无法访问',
      errorMsg: [err.index]
    }
  );
};
