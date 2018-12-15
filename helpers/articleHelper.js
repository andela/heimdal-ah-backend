import slug from './generateSlug';
import models from '../models';

const { tags: Tag } = models;

const checkIdentifier = paramsSlug => (Number.isInteger(parseInt(paramsSlug, 10))
  ? {
    id: paramsSlug
  }
  : {
    slug: paramsSlug
  });

const pageInfo = (page, size) => {
  const currentPage = Math.abs(Number(page)) || 1;
  let offset = 0;
  let limit = 10;
  const sizeNo = Number(size);
  if (!Number.isNaN(sizeNo) && sizeNo > 0) limit = size;
  offset = (currentPage - 1) * limit;

  if (Number.isNaN(offset)) offset = 10;
  return {
    limit,
    offset
  };
};

const checkTitle = (title, articleTitle) => {
  let articleSlug;
  if (!articleTitle) {
    articleSlug = slug(title);
  } else {
    articleSlug = `${slug(title)}-${Math.floor(Math.random() * (25 ** 6)).toString(36)}`;
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


const calcReadingTime = (bodyText) => {
  const matches = bodyText.match(/\S+/g);
  const numberOfWords = matches ? matches.length : 0;
  const averageWPM = 225;
  const readingTime = Math.ceil(numberOfWords / averageWPM);

  return readingTime > 1 ? `${readingTime} mins read` : `${readingTime} min read`;
};

export {
  checkIdentifier, pageInfo, checkTitle, checkUser, createNewTags, calcReadingTime
};
