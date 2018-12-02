// This function return error on users profile
const profileStatusResponseError = (res, statusCode, message, obj) => res.status(statusCode).json({
  message,
  errors: obj
});

// This function return ok on users profile
const profileStatusResponseOk = (res, statusCode, message, obj) => res.status(statusCode).json({
  message,
  profile: obj
});

// This function checks for user id being an integer on users profile creation
const checkUsersId = (req, res, next) => {
  const {
    userId
  } = req.params;

  if (!Number.isInteger(+userId)) {
    res.status(400).json({
      errors: {
        body: [
          'User Id must be an integer'
        ]
      }
    });
  }
  return next();
};

// This fucntion checks for a user entering valid inputs users profile update
const validProfileInput = (req, res, next) => {
  if (req.body.username === '' || req.body.biodata === '' || req.body.image === '' || req.body.address === '' || req.body.dateofbirth === '') {
    profileStatusResponseError(res, 400, 'User input(s) field must me not be empty', 'Invalid input');
  }
  return next();
};

// Export all middlewares here
export {
  profileStatusResponseOk, profileStatusResponseError, checkUsersId, validProfileInput
};
