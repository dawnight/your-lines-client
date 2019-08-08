export const LOGO_INFO = {
  alt: 'your lines logo',
  url: 'http://image.ikite.top/google-logo.jpg'
};

export const NAV_LIST = [
  { id: 'home', href: '/', name: '首页' },
  { id: 'tv', href: '/tv', name: '影视中心' },
  { id: 'post', href: '/post', name: '投稿' },
  { id: 'index.njk', href: '/message', name: '留言' },
  { id: 'about', href: '/about', name: '关于' }
];

export const UPLOAD_FORMAL_LIST = [
  { id: 'movie', name: '电影' },
  { id: 'tv', name: '电视剧' },
  { id: 'carton', name: '动漫' },
  { id: 'other', name: '其他' }
];

export const SEARCH_FORMAL_LIST = [
  { id: 'all', name: '全部形式' },
  ...UPLOAD_FORMAL_LIST
];

export const UPLOAD_AREA_LIST = [
  { id: 'gat', name: '港澳台' },
  { id: 'usa', name: '美国' },
  { id: 'japan', name: '日本' },
  { id: 'korea', name: '韩国' },
  { id: 'other', name: '其他' },
  { id: 'no', name: '未知' }
];

export const SEARCH_AREA_LIST = [
  { id: 'all', name: '全部地区' },
  { id: 'mainland', name: '中国大陆' },
  ...UPLOAD_AREA_LIST
];

export const UPLOAD_LANGUAGE_LIST = [
  { id: 'en', name: '英语' },
  { id: 'jp', name: '日语' },
  { id: 'ko', name: '韩语' },
  { id: 'other', name: '其他' },
  { id: 'no', name: '未知' }
];

export const LANGUAGE_LIST = [
  { id: 'cn', name: '汉语' },
  ...UPLOAD_LANGUAGE_LIST
];

export const SEARCH_HELPER_LIST = [
  { id: 'new', name: '最新上传' },
  { id: 'like', name: '点赞最多' }
];

export const PREFIX_URL = 'http://upload.ikite.top';

export const qiniuConfig = {
  AK: '**',
  SK: '**',
  bucket: 'upload',
  preUrl: 'http://upload.ikite.top/'
};
