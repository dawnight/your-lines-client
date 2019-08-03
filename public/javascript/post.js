const postBtn = $('#postBtn');

console.log(postBtn);

postBtn.click(() => {

  const nameCn = $('#nameCn').val();
  const nameEn = $('#nameEn').val();
  const area = $('#area').val();
  const linesLangId = $('#linesLangId').val();
  const linesTextareaId = $('#linesTextareaId').val();
  const transLangId = $('#transLangId').val();
  const transTextareaId = $('#transTextareaId').val();

  let validateList = [
    { key: 'nameCn', value: '中文剧名' },
    { key: 'nameEn', value: '英文剧名' },
    { key: 'area', value: '所在地区' },
    { key: 'linesLangId', value: '剧中台词语言' },
    { key: 'linesTextareaId', value: '剧中台词' },
    { key: 'transLangId', value: '剧中台词翻译' },
    { key: 'transTextareaId', value: '台词翻译' },
  ];

  let params = {
    nameCn: nameCn,
    nameEn: nameEn,
    area: area,
    linesLangId: linesLangId,
    linesTextareaId: linesTextareaId,
    transLangId: transLangId,
    transTextareaId: transTextareaId
  };

  let flag;

  validateList.forEach(item => {
    console.log(item.key, params[item.key]);
    if (!params[item.key]) {
      flag = item;
    }
  });

  console.log(flag);

  if (flag) {
    window.$message({
      status: 'error',
      content: `${flag.value} 不能为空`
    });
  }

  console.log(params);

});














