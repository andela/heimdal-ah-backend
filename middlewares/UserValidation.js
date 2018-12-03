/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import { check, validationResult, body } from 'express-validator/check';
import UserModelQuery from '../lib/user';

import db from '../models/index';
const { User } = db;
// this function validates the User signup function parameters
// invalid user parameters includes:
// existing user email
// invalid email
// password of length less than 8
// password not being alphanumeric
// ctrl + alt + d
// class UserValidation {
/**
 * @apiParam  {String} [userName] username
 * @apiParam  {String} [email] Email
 * @apiParam  {String} [password] Password
 *
 * @class UserValidation middleware that validates the user signup details.
 */
class UserValidation {
  static validateUserSignUp(req, res, next) {
    UserValidation.checkUserEmail(req, res, next);
    UserValidation.checkPassword(req, res, next);
    UserValidation.checkUserName(req, res, next);
    UserValidation.showError(req, res, next);
  }

  /**
   *
   *
   * @static
   * @param {*} req
   * @memberof UserValidation
   */
  static checkUserEmail(req, res, next) {
    const { email } = req.body;
    req.checkBody('email', 'email cannot be undefined').custom(val => val !== undefined);
    req.checkBody('email', 'please enter an email').notEmpty();
    req.checkBody('email', 'please enter a valid email').isEmail();
  }

  /**
   *
   *
   * @static
   * @param {*} req
   * @memberof UserValidation
   */
  static checkPassword(req, res, next) {
    const { password } = req.body;
    req.checkBody('password', 'password cannot be undefined').custom(val => val !== undefined);
    req.checkBody('password', 'password cannot be empty').notEmpty();
    req.checkBody('password', 'password must be at least 8 characters').isLength({ min: 8 });
    req.checkBody('password', 'password must not contain space').matches(/^\S*$/);
    req
      .checkBody('password', 'password must contain a letter and number')
      .matches(/^((?=.*\d))(?=.*[a-zA-Z])/);
    
  }

  static checkUserName(req, res, next) {
    const { userName } = req.body;
    5
    req.checkBody('userName', 'username cannot be undefined').custom(val => val !== undefined);
    req.checkBody('userName', 'please enter a Username, it cannot be empty').notEmpty();
    req
      .checkBody(
        'userName',
        'please enter a valid username can contain a letter or mixture of both letter and number'
      )
      .isAlphanumeric();
    req
      .checkBody('userName', 'please enter a valid username, cannot be more than 20 characters')
      .isLength({ max: 20 });
  }

  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @memberof UserValidation
   */
  static async showError(req, res, next) {
    try {
      const errors = await req.validationErrors();
      const err = [];
      if (errors) {
        errors.forEach(({ param, msg }) => {
          if (err[param] === undefined) {
            err[param] = {
              msg
            };
          }
        });
        return res.status(422).json({ errors: { ...err } });
      }
      next()
    }
    catch (error){
      throw error;
    }
  }
  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   * @memberof UserValidation
   */
  static async checkEmailExist(req, res, next) {
    const { email } = req.body;
    try {
      const user = await UserModelQuery.getUserByEmail(email);
      if(user) {
        return res.status(409).json({
          errors : {
            message : 'This email has been taken'
          }
        });
      }    
      next()
    } catch (error) {
      throw error;
    }
  }
}

export default UserValidation;
