import models from '../models';
import StatusResponse from '../helpers/StatusResponse';

const { HighlightedText } = models;

const highlightsLogic = {
  /**
   * @description It updates the startIndex, StopIndex and stillExist of highlightedPortions
   * @param {Array} highlightedPortions
   * @param {String} body
   * @param {String} userId
   * @returns {Array} An array of the updated highlights
   */
  async updateHighlights(highlightedPortions, body, userId) {
    let updatedPortions = [];

    for (let i = 0; i < highlightedPortions.length; i += 1) {
      const { text: highlightedText } = highlightedPortions[i];

      // eslint-disable-next-line no-await-in-loop
      const thisHighlight = await HighlightedText.findOne({
        where: {
          id: highlightedPortions[i].id,
          userId
        }
      });

      if (thisHighlight) {
        const checkHighlightedText = body.includes(highlightedText);
        if (checkHighlightedText) {
          const startIndex = body.indexOf(highlightedText);
          const stopIndex = startIndex + highlightedText.length;
          const newHighlightId = `${startIndex}-${stopIndex}`;

          const thisUpdate = thisHighlight.update(
            {
              startIndex,
              stopIndex,
              highlightId: newHighlightId,
              stillExist: true
            },
            { returning: true }
          );
          updatedPortions.push(thisUpdate);
        } else {
          const thisUpdate = thisHighlight.update(
            {
              stillExist: false
            },
            { returning: true }
          );
          // updatedPortions.push(thisUpdate);
        }
      }
    }

    updatedPortions = await Promise.all(updatedPortions);
    return updatedPortions;
  },

  /**
 * @description This method is used to create new tags abd return the created tag ids
 * @param {Object} body - the recently created sequelize article
 * @param {Array} highlightedPortions - An array of tags <= 5
 * @param {Object} res - the recently created sequelize article
 * @returns {Object} object - the sequelize object of article tags
 */
  checkUpdateParams(body, highlightedPortions, res) {
    if (!highlightedPortions) {
      StatusResponse.badRequest(res, {
        success: false,
        message: 'Please supply the highlighted portions'
      });
    }
    if (!Array.isArray(highlightedPortions)) {
      StatusResponse.badRequest(res, {
        success: false,
        message: 'Highlighted portions supplied must be an array'
      });
    }
    if (!body) {
      StatusResponse.success(res, {
        success: false,
        message: 'This article has no content'
      });
    }
  }
};

export default highlightsLogic;
