import slugify from 'slugify';

const checkIdentifier = identifier => (
  Number.isInteger(parseInt(identifier, 10))
    ? { id: identifier }
    : { slug: identifier }
);

const generateSlug = (title, articleTitle) => {
  let articleSlug;
  if (articleTitle === null) {
    articleSlug = slugify(title);
  } else {
    articleSlug = `${slugify(title)}-${(
      Math.floor(Math.random() * (25 ** 6))).toString(36)}`;
  }
  return articleSlug;
};

const checkUser = (article, userId) => article.userId === userId;

export {
  checkIdentifier,
  generateSlug,
  checkUser,
};
