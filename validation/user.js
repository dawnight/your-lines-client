import { body } from 'express-validator';

export const login = [
  body('email').isLength({ min: 8 }).withMessage('邮箱不能为空'),
  body('password').isLength({ min: 8 }).withMessage('密码不能为空')
];

export const signUp = [
  body('email').isLength({ min: 8 }).withMessage('邮箱不能为空'),
  body('password').isLength({ min: 8 }).withMessage('密码不能为空'),
  body('rePassword').isLength({ min: 8 }).withMessage('确认密码不能为空')
];
