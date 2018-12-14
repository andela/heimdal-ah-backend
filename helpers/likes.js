import Models from '../models';
import StatusResponse from './StatusResponse';
/** @description function to like an article
   * @param {string} res is the request parameter
   * @param {string} articleId is the response parameter
   *  @param {string} commentId is the response parameter
   * @return {object} the response object
   * @public
   */
const like = async (res, articleId, commentId) => {
  const { likes } = Models;
  const { userId } = res.locals.user;

  try {
    const ifExist = await likes.findOne({
      where: {
        userId,
        articleId,
        commentId
      }
    });
      // if like already exist
    if (ifExist) {
      await likes.destroy({
        where: {
          userId,
          articleId,
          commentId
        }
      });
      return StatusResponse.success(res, { message: 'hurray!!! you UNliked this article' });
    }

    const add = await likes.create({
      userId,
      articleId,
      commentId
    });

    if (!add) {
      return StatusResponse.badRequest(res, { message: 'error like could not be added' });
    }

    return StatusResponse.success(res, { message: 'hurray! you liked this article' });
  } catch (error) {
    return StatusResponse.internalServerError(error);
  }
};

const numOflikers = async (res, id) => {
  const { likes, users } = Models;
  try {
    const numOfLikes = await likes.findAndCountAll({
      where: {
        id
      },
      include: [{
        model: users,
        as: 'user',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'slug', 'resettingPassword', 'password']
        }
      }]
    });
    if (!numOfLikes) {
      return StatusResponse.notfound(res, { message: 'cannot fetch the likes' });
    }
    return StatusResponse.success(res, numOfLikes);
  } catch (error) {
    return StatusResponse.internalServerError(res, { message: 'server error' });
  }
};

export {
  like,
  numOflikers
};
