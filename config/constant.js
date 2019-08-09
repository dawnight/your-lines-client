export const LOGO_INFO = {
  alt: 'your lines logo',
  url: 'http://image.ikite.top/google-logo.jpg'
};

export const NAV_MAP = [
  { id: 'home', href: '/', name: '首页' },
  { id: 'tv', href: '/tv', name: '影视中心' },
  { id: 'post', href: '/post', name: '投稿' },
  { id: 'index.njk', href: '/message', name: '留言' },
  { id: 'about', href: '/about', name: '关于' }
];

export const UPLOAD_FORMAL_MAP = [
  { id: 'movie', name: '电影' },
  { id: 'tv', name: '电视剧' },
  { id: 'carton', name: '动漫' },
  { id: 'other', name: '其他' }
];

export const UPLOAD_FORMAL_LIST = UPLOAD_FORMAL_MAP.map(item => item.id);

export const SEARCH_FORMAL_MAP = [
  { id: 'all', name: '全部形式' },
  ...UPLOAD_FORMAL_MAP
];

export const SEARCH_FORMAL_LIST = SEARCH_FORMAL_MAP.map(item => item.id);

export const UPLOAD_AREA_MAP = [
  { id: 'mainland', name: '中国大陆' },
  { id: 'gat', name: '港澳台' },
  { id: 'usa', name: '美国' },
  { id: 'japan', name: '日本' },
  { id: 'korea', name: '韩国' },
  { id: 'other', name: '其他' },
  { id: 'no', name: '未知' }
];

export const UPLOAD_AREA_LIST = UPLOAD_AREA_MAP.map(item => item.id);

export const SEARCH_AREA_MAP = [
  { id: 'all', name: '全部地区' },
  ...UPLOAD_AREA_MAP
];

export const SEARCH_AREA_LIST = SEARCH_AREA_MAP.map(item => item.id);

export const UPLOAD_LANGUAGE_MAP = [
  { id: 'cn', name: '汉语' },
  { id: 'en', name: '英语' },
  { id: 'jp', name: '日语' },
  { id: 'ko', name: '韩语' },
  { id: 'other', name: '其他' },
  { id: 'no', name: '未知' }
];

export const UPLOAD_LANGUAGE_LIST = UPLOAD_LANGUAGE_MAP.map(item => item.id);

export const LANGUAGE_MAP = UPLOAD_LANGUAGE_MAP;

export const LANGUAGE_LIST = LANGUAGE_MAP.map(item => item.id);

export const SEARCH_HELPER_MAP = [
  { id: 'new', name: '最新上传' },
  { id: 'like', name: '点赞最多' }
];

export const SEARCH_HELPER_LIST = SEARCH_HELPER_MAP.map(item => item.id);

export const FILE_TYPE_MAP = [
  { id: 'image', name: '图片' },
  { id: 'audio', name: '音乐' },
  { id: 'video', name: '视频' },
  { id: 'word', name: 'word' },
  { id: 'excel', name: 'excel' },
  { id: 'ppt', name: 'ppt' },
  { id: 'pdf', name: 'pdf' },
  { id: 'txt', name: 'txt' },
];

export const FILE_TYPE_LIST =  FILE_TYPE_MAP.map(item => item.id);

export const PREFIX_URL = 'http://upload.ikite.top';

export const qiniuConfig = {
  AK: 's3pvYpoUGW_ehfTxWcP1wN5Tq_y6J8k62k69UPE4',
  SK: 'jkXmYL3qe1dffZ79Y36UzsiLV8hG7nFTWTGjd_7k',
  bucket: 'upload',
  preUrl: 'http://upload.ikite.top/'
};
