import { navList, logoInfo } from './common';
import UserModel from '../model/schema/user';

const page = 'user';

export const renderUser = (req, res) => {
  res.render('user/index', {
    user: req.session.user,
    page,
    navList,
    logoInfo
  });
};

export const renderLogin = (req, res) => {
  let user = req.session.user;
  if (!user) {
    res.render('user/login', {
      page,
      user: null,
      error: req.flash('error'),
      email: req.flash('email'),
      navList,
      logoInfo
    });
  } else {
    let referer = req.headers.referer;
    if (referer) {
      res.redirect(referer);
    } else {
      res.redirect('/');
    }
  }
};

export const renderSignUp = (req, res) => {
  let user = req.session.user;

  if (!user) {
    res.render('user/signUp', {
      page,
      user: user,
      error: req.flash('error'),
      email: req.flash('email'),
      navList,
      logoInfo
    });
  } else {
    let referer = req.headers.referer;
    if (referer) {
      res.redirect(referer);
    } else {
      res.redirect('/');
    }
  }
};

export const renderLogout = (req, res) => {
  req.session.user = null;
  res.redirect('/');
};

export const signUp = async (req, res) => {

  const { email, password, rePassword } = req.body;

  if (password !== rePassword) {

    req.flash('error', '两次输入的密码不一致');

    req.flash('email', email);

    return res.redirect('/user/signUp');

  }
  try {

    let user = await UserModel.findOne({ email });

    if (user) {

      req.flash('error', '邮箱已被占用');

      req.flash('email', email);

      return res.redirect('/user/signUp');
    }

    user = await UserModel.create({ email, password });

    req.session.user = user;

    return res.redirect('/');

  } catch (err) {

    req.flash('error', '服务出错');

    return res.redirect('/user/signUp');
  }
};

export const login = async (req, res) => {

  const { email, password } = req.body;

  console.log(email, password);

  try {

    let user = await UserModel.findOne({ email });

    console.log(user);

    if (user) {
      user.comparePassword(password, user.password, (err, match) => {

        if (match) {

          req.session.user = new UserModel(user);

          req.flash('success', '登录成功');

          res.redirect('/');

        } else {

          req.flash('error', '用户名或密码错误');

          req.flash('email', email);

          return res.redirect('/user/login');

        }
      });
    } else {

      req.flash('error', '用户不存在');

      return res.redirect('/user/login');

    }
  } catch (err) {

    req.flash('error', '服务出错');

    return res.redirect('/user/login');
  }

};

