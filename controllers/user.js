import { navList, logoInfo } from './common';
import UserModel from '../model/schema/user';
import { SEARCH_TYPE_LIST, SEARCH_AREA_LIST, SEARCH_HELPER_LIST } from '../config/constant';
import { STATUS } from '../config/basic';

const searchTypeList = SEARCH_TYPE_LIST;
const searchAreaList = SEARCH_AREA_LIST;
const searchHelperList = SEARCH_HELPER_LIST;
/*
* 整理注册登录的流程
* 注册流程：进入注册页面，注册成功后，跳转到注册提示页面，
*
* */

export const renderLogin = (req, res) => {
  res.render('pages/login', {
    navList,
    logoInfo,
    page: 'user',
    user: req.session.user
  });
};

export const renderSignUp = (req, res) => {

  res.render('pages/signUp', {
    navList,
    logoInfo,
    page: 'user',
    user: req.session.user
  });
};

export const renderLogout = (req, res) => {
  req.session.user = null;
  res.redirect('/');
};

export const signUp = async (req, res) => {
  const { email, password, rePassword } = req.body;

  if (password !== rePassword) {
    res.status = 400;
    return res.json({
      msg: '两次输入的密码不一致'
    });
  }
  try {
    let user = await UserModel.findOne({ email });

    if (user) {
      return res.json({
        msg: '邮箱已被占用',
        status: STATUS.CODE_ERROR
      });
    }

    user = await UserModel.create({ email, password });

    res.json({
      data: user,
      msg: '注册成功',
      status: STATUS.CODE_OK
    });

  } catch (err) {
    res.status = 500;
    return res.json({
      msg: err,
      status: STATUS.CODE_ERROR
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email });

    if (user) {
      user.comparePassword(password, user.password, (err, match) => {

        if (match) {

          req.session.user = new UserModel(user);

          res.json({
            msg: '登录成功',
            status: STATUS.CODE_OK
          });

        } else {
          return res.json({
            msg: '用户名或密码错误',
            status: STATUS.CODE_ERROR
          });
        }
      });
    } else {
      res.status = 400;
      return res.json({
        msg: '用户未注册',
        status: STATUS.CODE_ERROR
      });
    }
  } catch (err) {
    res.status = 500;
    return res.json({
      msg: err,
      status: STATUS.CODE_ERROR
    });
  }

};
