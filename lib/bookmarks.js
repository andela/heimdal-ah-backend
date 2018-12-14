import Model from '../models';

const { bookmarks, articles, users } = Model;

/** @description validate bookmarks
   * @param {integer} userId is the request parameter
   * @param {integer} articleId is the response parameter
   * @return {object} the response object
   * @public
   */
const validateBookmarks = async (userId, articleId) => {
  try {
    const user = await users.findOne({
      where: {
        id: userId
      }
    });
    const article = await articles.findOne({
      where: {
        id: articleId
      }
    });
    const isAvalaible = await bookmarks.findOne({
      where: {
        userId,
        articleId
      }
    });

    if (!article || isAvalaible || !user) {
      return false;
    }
    return true;
  } catch (error) {
    return error;
  }
};

export default validateBookmarks;
