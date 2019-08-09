import { navMap, logoInfo } from './common';
import UserModel from '../model/schema/user';
import { validationResult } from 'express-validator';

const page = 'user';

export const renderUser = (req, res) => {
  res.render('user/index', {
    user: req.session.user,
    page,
    navMap,
    logoInfo
  });
};

export const renderLogin = (req, res) => {
  let user = req.session.user;
  if (!user) {
    res.render('user/login', {
      page,
      user: null,
      errors: req.flash('errors'),
      email: req.flash('email'),
      navMap,
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
      user: user,
      page,
      errors: req.flash('errors'),
      email: req.flash('email'),
      navMap,
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

  let vRes = validationResult(req);

  if (!vRes.isEmpty()) {

    req.flash('errors', vRes.errors);

    return res.status(422).redirect('/user/signUp');
  }

  const { email, password, rePassword } = req.body;

  if (password !== rePassword) {

    req.flash('errors', [{
      msg: '两次输入的密码不一致'
    }]);

    req.flash('email', email);

    return res.redirect('/user/signUp');

  }
  try {

    let user = await UserModel.findOne({ email });

    if (user) {

      req.flash('errors', [{
        msg: '邮箱已被占用'
      }]);

      req.flash('email', email);

      return res.redirect('/user/signUp');
    }

    user = await UserModel.create({ email, password });

    req.session.user = user;

    return res.redirect('/');

  } catch (err) {

    req.flash('errors', [{
      msg: '服务出错'
    }]);

    return res.redirect('/user/signUp');
  }
};

export const login = async (req, res) => {

  let vRes = validationResult(req);

  console.log(vRes.errors);

  if (!vRes.isEmpty()) {

    req.flash('errors', vRes.errors);

    return res.status(422).redirect('/user/login');
  }


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

          req.flash('errors', [{
            msg: '用户名或密码错误'
          }]);

          req.flash('email', email);

          return res.redirect('/user/login');

        }
      });
    } else {

      req.flash('errors', [{
        msg: '用户不存在'
      }]);

      return res.redirect('/user/login');

    }
  } catch (err) {

    req.flash('errors', [{
      msg: '服务出错'
    }]);

    return res.redirect('/user/login');
  }

};

