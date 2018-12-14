import slug from './generateSlug';

const checkIdentifier = paramsSlug => (
  Number.isInteger(parseInt(paramsSlug, 10))
    ? { id: paramsSlug }
    : { slug: paramsSlug }
);

const pageInfo = (page, size) => {
  const currentPage = Math.abs(Number(page)) || 1;
  let offset = 0;
  let limit = 10;
  const sizeNo = Number(size);
  if (!Number.isNaN(sizeNo) && sizeNo > 0) limit = size;
  offset = (currentPage - 1) * limit;

  if (Number.isNaN(offset)) offset = 10;
  return { limit, offset };
};

const checkTitle = (title, articleTitle) => {
  let articleSlug;
  if (!articleTitle) {
    articleSlug = slug(title);
  } else {
    articleSlug = `${slug(title)}-${(
      Math.floor(Math.random() * (25 ** 6))).toString(36)}`;
  }
  return articleSlug;
};

const checkUser = (article, userId) => article.userId === userId;

export {
  checkIdentifier,
  pageInfo,
  checkTitle,
  checkUser
};
