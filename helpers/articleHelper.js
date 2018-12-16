import slugify from 'slugify';
import models from '../models';

const { tags: Tag } = models;
const checkIdentifier = identifier => (
  Number.isInteger(parseInt(identifier, 10))
    ? { id: identifier }
    : { slug: identifier }
);

const checkTitle = (title, articleTitle) => {
  let articleSlug;
  if (articleTitle === null) {
    articleSlug = slugify(title);
  } else {
    articleSlug = `${slugify(title)}-${Math.floor(Math.random() * (25 ** 6)).toString(36)}`;
  }
  return articleSlug;
};

const checkUser = (article, userId) => article.userId === userId;

/**
 * @description This method is used to create new tags abd return the created tag ids
 * @param {Array} tags - An array of tags <= 5
 * @param {Object} article - the recently created sequelize article
 * @returns {Object} object - the sequelize object of article tags
 */
const createNewTags = async (tags) => {
  let tagList = tags.map(async thisTag => Tag.findOrCreate({
    where: {
      tagName: thisTag
    }
  }));

  tagList = await Promise.all(tagList);
  const tagIds = tagList.map(pickedTag => pickedTag[0].id);

  return tagIds;
};

export {
  checkIdentifier,
  checkUser,
  checkTitle,
  createNewTags
};
