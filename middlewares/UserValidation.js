// this function validates the User signup function parameters
//invalid user parameters includes:
//existing user email
//invalid email
//password of length less than 8
//password not being alphanumeric
//ctrl + alt + d
// class UserValidation {
/**
 *
 *
 * @class UserValidation
 */
class UserValidation {

  static isEmail(email) {
    return (email.match(/\S+@\S+\.\S+/));
  }

  static validateEmail(req) {
    req.checkBody('email', 'please enter email').exists();
    req.checkBody('email', 'please enter a valid email').isEmail();
  }

  static validatePassword(req) {
    req.checkBody('password', 'please enter password').exists();
    req.checkBody('password', 'password must be at least 8 characters')
      .isLength({ min: 8 });
    req.checkBody('password', 'password must contain a letter and number')
      .matches(/^((?=.*\d))(?=.*[a-zA-Z])/);
    req.checkBody('password', 'password must not contain space')
      .matches(/^\S*$/);
  }


  static validateFullName(req) {
    message.length = 0;
    let { fullName } = req.body;
    req.checkBody('fullName', 'full name is too long').isLength({ max: 40 });
    fullName = fullName === undefined ? '' : fullName;
    const [firstName, ...lastName] = fullName.toString().trim().split(' ');
    if (lastName.join(' ').trim().includes(' ')) {
      message.push('You entered more than two names');
    }
    if (!/^[a-zA-Z-]+$/.test(firstName)
    || !/^[a-zA-Z-]+$/.test(lastName.join(''))) {
      message.push('Invalid full name');
      message
        .push('please enter first name and last name separated by space');
    }
    req.body.fullName = `${firstName} ${lastName.join('')}`;
  }


  static checkExistingEmail(req, res, next) {
    const { email } = req.body;
    checkEmail(email)
      .then((emailFound) => {
        if (!emailFound) return next();
        if (emailFound) {
          return res.status(409).json({
            errors: {
              email: ['email is already in use']
            }
          });
        }
      })
      .catch(err => res.status(500).json({
        error: {
          message: ['error reading user table', `${err}`]
        }
      }));
  }
}
