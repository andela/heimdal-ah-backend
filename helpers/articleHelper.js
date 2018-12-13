import slug from './generateSlug';

const checkIdentifier = paramsSlug => (
  Number.isInteger(parseInt(paramsSlug, 10))
    ? { id: paramsSlug }
    : { slug: paramsSlug }
);

const pageInfo = (total, page, size) => {
  let currentPage = page;
  const pageNo = Number(currentPage);
  if (!Number.isNaN(pageNo) && pageNo > 0) currentPage = 1;

  let limit;
  const sizeNo = Number(size);
  if (!Number.isNaN(sizeNo) && sizeNo > 0) limit = size;
  limit = 10;
  let totalPages = Math.ceil(total / limit);
  if (!totalPages) totalPages = 1;

  currentPage = Math.min(totalPages, page);
  let offset = (page - 1) * limit;
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
