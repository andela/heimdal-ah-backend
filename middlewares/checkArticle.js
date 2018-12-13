// import StatusResponse from '../helpers/StatusResponse';
// import models from '../models';
// import checkIdentifier from '../helpers/articleHelper';

// const { articles } = models;

// // const checkArticle = async (req, res, next) => {
// //   const paramsSlug = checkIdentifier(req.params.identifier);
// //   try {
// //     const fetchArticle = await articles.findOne({
// //       where: {
// //         ...paramsSlug
// //       }
// //     });
// //     if (!fetchArticle) {
// //       return StatusResponse.notfound(res, {
// //         message: 'Could not find article'
// //       });
// //     }
// //   } catch (error) {
// //     StatusResponse.internalServerError(res, {
// //       message: `something went wrong, please try again.... ${error}`
// //     });
// //   }
// //   return next();
// // };

// const checkUser = async (req, res, next) => {
//   const paramsSlug = checkIdentifier(req.params.identifier);
//   const article = await articles.findOne({
//     where: {
//       ...paramsSlug
//     },
//   });
//   if (article.userId !== req.userId) {
//     StatusResponse.forbidden(res, {
//       message: ''
//     });
//   }
//   return next();
// };


// export default checkUser;
