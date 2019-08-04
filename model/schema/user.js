import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { formatTime, randomString } from '../../helpers/utils';

const Schema = mongoose.Schema;
const SAFE_WORK_FACTOR = 5;

const UserSchema = new Schema({
  username: { type: String, default: randomString() },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: false },
  avatarUrl: { type: String, required: false },
  phone: { type: String, required: false },
  isActivated: { type: Boolean, default: false, select: false },
  isDisabled: { type: Boolean, default: false, select: false },
  createTime: { type: Date, default: Date.now() },
  updateTime: { type: Date, default: Date.now(), select: false },
  remark: { type: String, required: false }
});

UserSchema.pre('save', function(next) {
  let user = this;
  user.updateTime = new Date();
  if (user.isNew) {
    user.createTime = user.updateTime = Date.now();
  } else {
    user.updateTime = Date.now();
  }
  if (user.isNew || user.isModified('password')) {
    bcrypt.genSalt(SAFE_WORK_FACTOR, (error, salt) => {
      if (error) {
        return next();
      }
      bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) {
          return next();
        }
        user.password = hash;
        return next();
      });
    });
  }
});

UserSchema.methods.toJSON = function() {
  let result = this.toObject();
  result.createTime = formatTime(result.createTime);
  result.updateTime = formatTime(result.updateTime);
  result.id = result._id;
  delete result._id;
  delete result.password;
  delete result.__v;
  return result;
};

UserSchema.methods.comparePassword = function(candidatePassword, password, callback) {
  bcrypt.compare(candidatePassword, password, (error, isMatch) => {
    if (error) {
      return callback(error);
    }
    callback(null, isMatch);
  });
};

let UserModel = mongoose.model('user', UserSchema);

export default UserModel;
