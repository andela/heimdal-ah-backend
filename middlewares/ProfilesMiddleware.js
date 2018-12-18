import StatusResponse from '../helpers/StatusResponse';
import model from '../models';

const { profiles } = model;

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
    StatusResponse.badRequest(res, {
      message: 'User input(s) field must me not be empty',
      error: {
        body: ['Invalid input']
      }
    });
  }
  return next();
};

// This function checks to see whether a profile exist or not [used in filtering articles by author]
const getAuthor = async (req, res, next) => {
  const author = await profiles.findOne({
    where: {
      username: req.query.author
    },
  });
  if (!author) {
    return StatusResponse.notfound(res, {
      message: 'No such author',
    });
  }
  req.app.locals.user = {
    userId: author.userId,
  };
  return next();
};

// Export all middlewares here
export { checkUsersId, validProfileInput, getAuthor };
