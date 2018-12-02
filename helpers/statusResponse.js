const sendResponse40x = (response, statusCode, message, status) => response.status(statusCode)
  .send({
    status,
    data: {
      message,
    },
  });
const sendResponse20x = (response, statusCode, status, message, todo, token) => response
  .status(statusCode).send({
    status,
    data: {
      message,
      todo,
      token
    },
  });

export default {
  sendResponse40x, sendResponse20x
};
