import { formatTime } from '../../helpers/utils';

export const COMMON_FIELDS = {
  isDisabled: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  createTime: { type: Date, default: new Date, get: time => formatTime(time) },
  updateTime: { type: Date, default: new Date, get: time => formatTime(time) },
  remark: { type: String, required: false }
};
