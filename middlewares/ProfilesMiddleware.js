import Response from '../helpers/StatusResponse';

// This function checks for user id being an integer on [users profile creation]
const checkUsersId = (req, res, next) => {
  const { userId } = req.params;

  if (!Number.isInteger(+userId)) {
    res.status(400).json({
      errors: {
        body: ['User Id must be an integer']
      }
    });
  }
  return next();
};

// This fucntion checks for a user entering valid inputs [users profile update]
const validProfileInput = (req, res, next) => {
  if (
    !req.body.username
    || !req.body.biodata
    || !req.body.image
    || !req.body.address
    || !req.body.dateofbirth
  ) {
    Response.badRequest(res, {
      message: 'User input(s) field must me not be empty',
      error: {
        body: ['Invalid input']
      }
    });
  }
  return next();
};

// Export all middlewares here
export { checkUsersId, validProfileInput };
