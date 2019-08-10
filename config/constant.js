import { reduceListToObj } from '../helpers/utils';

export const logoInfo = {
  alt: 'your lines logo',
  url: 'http://image.ikite.top/google-logo.jpg'
};

export const navList = [
  { id: 'home', href: '/', name: '首页' },
  { id: 'tv', href: '/tv', name: '影视中心' },
  { id: 'post', href: '/post', name: '投稿' },
  { id: 'index.njk', href: '/message', name: '留言' },
  { id: 'about', href: '/about', name: '关于' }
];

export const uploadFormalList = [
  { id: 'movie', name: '电影' },
  { id: 'tv', name: '电视剧' },
  { id: 'carton', name: '动漫' },
  { id: 'other', name: '其他' }
];

export const uploadFormalMap = reduceListToObj(uploadFormalList);

export const uploadFormalIdList = Object.keys(uploadFormalMap);

export const searchFormalList = [
  { id: 'all', name: '全部形式' },
  ...uploadFormalList
];

export const searchFormalMap = reduceListToObj(searchFormalList);

export const searchFormalIdList = Object.keys(searchFormalMap);

export const uploadAreaList = [
  { id: 'mainland', name: '中国大陆' },
  { id: 'gat', name: '港澳台' },
  { id: 'usa', name: '美国' },
  { id: 'japan', name: '日本' },
  { id: 'korea', name: '韩国' },
  { id: 'other', name: '其他' },
  { id: 'no', name: '未知' }
];

export const uploadAreaMap = reduceListToObj(uploadAreaList);

export const uploadArealIdList = Object.keys(uploadAreaMap);

export const searchAreaList = [
  { id: 'all', name: '全部地区' },
  ...uploadAreaList
];

export const searchAreaMap = reduceListToObj(searchAreaList);

export const searchAreaIdList = Object.keys(searchAreaMap);

export const uploadLanguageList = [
  { id: 'cn', name: '汉语' },
  { id: 'en', name: '英语' },
  { id: 'jp', name: '日语' },
  { id: 'ko', name: '韩语' },
  { id: 'other', name: '其他' },
  { id: 'no', name: '未知' }
];

export const uploadLanguageMap = reduceListToObj(uploadLanguageList);

export const uploadLanguageIdList = Object.keys(uploadLanguageMap);

export const searchLanguageList = [
  { id: 'all', name: '全部语言' },
  ...uploadLanguageList
];

export const searchLanguageMap = reduceListToObj(searchLanguageList);

export const searchLanguageIdList = Object.keys(searchLanguageMap);

export const searchHelperList = [
  { id: 'new', name: '最新上传' },
  { id: 'like', name: '点赞最多' }
];

export const searchHelperMap = reduceListToObj(searchHelperList);

export const searchHelperIdList = Object.keys(searchHelperMap);

export const fileTypeList = [
  { id: 'image', name: '图片' },
  { id: 'audio', name: '音乐' },
  { id: 'video', name: '视频' },
  { id: 'word', name: 'word' },
  { id: 'excel', name: 'excel' },
  { id: 'ppt', name: 'ppt' },
  { id: 'pdf', name: 'pdf' },
  { id: 'txt', name: 'txt' },
];

export const fileTypeMap =  reduceListToObj(fileTypeList);

export const fileTypeIdList = Object.keys(fileTypeMap);

export const PREFIX_URL = 'http://upload.ikite.top/';

export const qiniuConfig = {
  AK: 's3pvYpoUGW_ehfTxWcP1wN5Tq_y6J8k62k69UPE4',
  SK: 'jkXmYL3qe1dffZ79Y36UzsiLV8hG7nFTWTGjd_7k',
  bucket: 'upload',
  preUrl: 'http://upload.ikite.top/'
};
