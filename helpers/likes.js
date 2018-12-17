import Models from '../models';
import StatusResponse from './StatusResponse';
/** @description function to like an article and comments
   * @param {string} res is the request parameter
   * @param {string} payload is the response parameter
   *  @param {string} userId is the response parameter
   * @return {object} the response object
   * @public
   */
const like = async (res, payload) => {
  const { likes } = Models;
  const { userId, articleId, commentId } = payload;
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
      return StatusResponse.success(res, { message: 'Unlike was succesful' });
    }
    //  if like does not exist create new like
    await likes.create({
      userId,
      articleId,
      commentId
    });

    return StatusResponse.success(res, { message: 'like was successful' });
  } catch (error) {
    return StatusResponse.internalServerError(error);
  }
};

/** @description number of likes for comment and articles
   * @param {string} res is the request parameter
   * @param {string} payload is the response parameter
   * @return {object} the response object
   * @public
   */
const numOflikers = async (res, payload) => {
  const { likes, users } = Models;
  const { articleId, commentId } = payload;
  try {
    const numOfLikes = await likes.findAndCountAll({
      where: {
        articleId,
        commentId,
      },
      include: [{
        model: users,
        as: 'user',
        attributes: [
          'id', 'email', 'roleId'
        ]

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
