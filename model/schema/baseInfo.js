export const COMMON_FIELDS = {
  isDisabled: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now },
  remark: { type: String, required: false }
};
