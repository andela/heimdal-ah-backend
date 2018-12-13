import models from '../models';

const { tags: Tag } = models;

const articleHelper = {
  /**
   * @description This method is used to calculate an articles reading time
   * @param {String} bodyText - sentences, phrases, paragraphs etc
   * @returns {String} readingTime
   */
  calcReadingTime(bodyText) {
    const matches = bodyText.match(/\S+/g);
    const numberOfWords = matches ? matches.length : 0;
    const averageWPM = 225;
    const readingTime = Math.ceil(numberOfWords / averageWPM);

    return readingTime > 1 ? `${readingTime} mins read` : `${readingTime} min read`;
  },

  /**
   * @description This method is used to add all the tags to the current article
   * @param {Array} tags - An array of tags <= 5
   * @param {Object} article - the recently created sequelize article
   * @returns {Object} object - the sequelize object of article tags
   */
  async addArticleTags(tags, article) {
    let tagList = tags.map(async thisTag => Tag.findOrCreate({
      where: { tagName: thisTag }
    }));
    tagList = await Promise.all(tagList);
    const tagIds = tagList.map(pickedTag => pickedTag[0].id);

    return article.addTags(tagIds);
  }
};

export default articleHelper;
