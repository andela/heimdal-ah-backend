
/**
 * Response Class
 */
class Response {
  /**
   * set status constructor
   */
  constructor() {
    this.status = 200;
  }

  /**
 * @param {object} res
 * @param {object} data
 * @returns {object} json data
 */
  static success(res, data) {
    return res.status(201).json(data);
  }

  /**
 * @param {object} res
 * @param {object} data
 * @returns {object} json data
 */
  static notfound(res, data) {
    return res.status(404).json(data);
  }

  /**
 * @param {object} res
 * @param {object} data
 * @returns {object} json data
 */
  static conflict(res, data) {
    return res.status(409).json(data);
  }

  /**
 * @param {object} res
 * @param {object} data
 * @returns {object} json data
 */
  static internalServerError(res) {
    return res.status(500).json({ message: 'an error occoured' });
  }

  /**
 * @param {object} res
 * @param {object} data
 * @returns {object} json data
 */
  static badRequest(res, data) {
    return res.status(400).json(data);
  }
}


export default Response;
