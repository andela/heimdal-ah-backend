import models from '../models';
import StatusResponse from '../helpers/StatusResponse';

const { HighlightedText, users: User, articles: Article } = models;

/**
 * HighlightedTexts controller
 * @description This controller creates and stores highlighted texts with or without comments when
 * a portion of an article is selected.
 * @description It also fetches all the highlighted texts belonging to an article
 * @description It also fetches all the comments belonging to a highlighted section of an article
 * when the highlighted section is clicked
 */
class HighlightedTextsController {
  /**
   * @description  Method to create a highlightedText alone
   * @param {object} req
   * @param {object} res
   * @returns {object} The reponse object
   */
  static async createHighlight(req, res) {
    const { userId } = req.app.locals.user;
    const { articleId } = req.params;
    const thisArticle = await Article.findOne({ where: { id: articleId } });
    const { highlightedText, comment } = req.body;
    const { body } = thisArticle;

    // return res.send(body);

    const checkHighlightedText = body.includes(highlightedText);
    if (!checkHighlightedText) {
      const payload = {
        success: false,
        message:
          'You can not highlight or comment on this text as it does not exist within the article'
      };
      return StatusResponse.badRequest(res, payload);
    }
    const startIndex = req.body.startIndex || body.indexOf(highlightedText);
    const stopIndex = req.body.startIndex || startIndex + highlightedText.length;

    const highlightId = `${startIndex}-${stopIndex}`;

    try {
      const createdHighlight = await HighlightedText.create({
        highlightId,
        startIndex,
        stopIndex,
        comment,
        articleId,
        userId,
        text: highlightedText
      });

      const payload = {
        success: true,
        message: 'You successfully highlighted a section of this article',
        createdHighlight
      };
      return StatusResponse.created(res, payload);
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: `Something went wrong, please try again.... ${error}`
      });
    }
  }

  /**
   * @description  Method to fetch all comments belonging to a highlight
   * @param {object} req
   * @param {object} res
   * @returns {object} The reponse object
   */
  static async fetchHighlightComments(req, res) {
    const { articleId, highlightId } = req.params;

    try {
      const comments = await HighlightedText.findAll({
        where: {
          articleId,
          highlightId
        },
        include: {
          model: User,
          as: 'users'
        }
      });

      const payload = {
        success: true,
        message: 'All comments belonging to this highlight has been fetched successfully',
        comments
      };
      return StatusResponse.created(res, payload);
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: `Something went wrong, please try again.... ${error}`
      });
    }
  }

  /**
   * @description  Method to fetch all highlights belonging to an article
   * @param {object} req
   * @param {object} res
   * @returns {object} The reponse object
   */
  static async fetchHighlights(req, res) {
    const { articleId } = req.params;

    try {
      const highlightedPortions = await HighlightedText.findAll({
        where: {
          articleId
        },
        group: ['highlightId', 'id']
      });

      const payload = {
        success: true,
        message: 'All highlights belonging to this article has been fetched successfully',
        highlightedPortions
      };
      return StatusResponse.created(res, payload);
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: `Something went wrong, please try again.... ${error}`
      });
    }
  }

  /**
   * @description  Method to update an articles highlighted indexes if the articles body is updated
   * @param {object} req
   * @param {object} res
   * @returns {object} The reponse object
   */
  static async updateHighlightedIndexes(req, res) {
    const { userId } = req.app.locals.user;
    const { articleId } = req.params;
    const { highlightedPortions, body } = req.body;

    try {
      for (let i = 0; i < highlightedPortions.length; i += 1) {
        const { highlightId, highlightedText } = highlightedPortions[i];

        const thisHighlight = HighlightedText.findOne({
          where: { highlightId, articleId, userId }
        });

        if (thisHighlight) {
          const checkHighlightedText = body.contains(highlightedText);
          if (checkHighlightedText) {
            const startIndex = body.indexOf(highlightedText);
            const stopIndex = startIndex + highlightedText.length;
            const newHighlightId = `${startIndex}-${stopIndex}`;

            thisHighlight.update({
              startIndex,
              stopIndex,
              highlightId: newHighlightId
            });
          } else {
            thisHighlight.update({
              stillExists: false
            });
          }
        }
      }

      const payload = {
        success: true,
        message: 'Highlight indexes have been updated'
      };
      return StatusResponse.success(res, payload);
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: `Something went wrong, please try again.... ${error}`
      });
    }
  }
}

export default HighlightedTextsController;
