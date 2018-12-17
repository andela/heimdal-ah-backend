import StatusResponse from '../helpers/StatusResponse';
import ReadingStatsModelQuery from '../lib/ReadingStatsModelQuery';

const { getUserReadingStats } = ReadingStatsModelQuery;

/**
 * @class { ReadingStatsController }
 * @description { Handles Reading stats GET Requests }
 */
class ReadingStatsController {
  /**
   * @description { Get all articles read by a specific user }
   * @param { object } req
   * @param { object } res
   *@return { object } statistics
   */
  static async getReadingStatistics(req, res) {
    const { userId } = req.app.locals.user;
    const userStats = await getUserReadingStats(userId, res);
    if (!userStats) {
      const payload = {
        message: 'Statistics not found for this user',
      };
      return StatusResponse.notfound(res, payload);
    }
    const userData = userStats.rows[0];
    const { username } = userData.profile;
    const payload = {
      message: `Number of articles read:${userStats.count} by ${username}`,
      readerStat: userStats.count,
      username,
      userData
    };
    return StatusResponse.success(res, payload);
  }
}

export default ReadingStatsController;
