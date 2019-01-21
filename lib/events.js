import eventEmitter from '../helpers/eventEmitter';
import eventTypes from '../events/eventTypes';
import FollowersModelQuery from './FollowersModelQuery';
import ArticleQueryModel from './ArticleQueryModel';
import UserModelQuery from './UserModelQuery';
import models from '../models';

const { comments } = models;


const articleEvent = async (info) => {
  const { userId, payload, newArticle } = info;

  const allReturnedFollowers = await FollowersModelQuery
    .findAllFollowingbByNotifications(userId);

  allReturnedFollowers.forEach(async (follower) => {
    eventEmitter.emit(eventTypes.POST_ARTICLE_NOTIFICATION, {
      to: follower.followerId,
      from: userId,
      type: eventTypes.NEW_ARTICLE,
      data: payload,
      link: `https://heimdal-ah-staging.herokuapp.com/api/v1/articles/${newArticle.id}`,
    });
  });
};

const commentEvent = async (info) => {
  const {
    articleId,
    userId,
    comment
  } = info;
  const article = await ArticleQueryModel.getArticleByIdentifier({ id: articleId });
  const users = await comments.findAll({
    where: {
      articleId
    },
    attributes: ['userId']
  });

  let userIds = users.map(user => user.userId);
  userIds.push(article.userId);
  userIds = [...new Set(userIds)];

  const { dataValues: { title, slug } } = article;

  userIds.forEach(async (notifyUserId) => {
    const recipient = await UserModelQuery.getUserByNotificationStatus(notifyUserId);
    eventEmitter.emit(eventTypes.COMMENT_NOTIFICATION_EVENT, {
      to: {
        userId: recipient.id,
        title,
        slug
      },
      from: userId,
      articleId,
      type: eventTypes.COMMENTED,
      data: comment.dataValues
    });
  });
};

const likesEvents = async (payload, likes) => {
  const { articleOwner, articleId, userId } = payload;
  const recipient = await UserModelQuery.getUserByNotificationStatus(articleOwner.id);
  eventEmitter.emit(eventTypes.ARTICLE_NOTIFICATION_EVENT, {
    to: recipient.id,
    from: userId,
    articleId,
    type: eventTypes.LIKED,
    data: likes.dataValues
  });
};

const followEvent = async (info) => {
  const { FollowedUser, userId, followUser } = info;

  const recipient = await UserModelQuery.getUserByNotificationStatus(FollowedUser);
  eventEmitter.emit(eventTypes.FOLLOW_INTERACTION_EVENT, {
    to: recipient.id,
    from: userId,
    type: eventTypes.FOLLOWED,
    data: followUser
  });
};

const ratingEvent = async (info) => {
  const { userId, articleId, usersRatings } = info;
  const articleOwner = await ArticleQueryModel.getArticleByIdentifier({
    id: articleId
  });
  const { userId: id, title, slug } = articleOwner.dataValues;

  const recipient = await UserModelQuery.getUserByNotificationStatus(id);
  eventEmitter.emit(eventTypes.RATING_INTERACTION_EVENT, {
    to: { userId: recipient.id, title, slug },
    from: userId,
    articleId,
    type: eventTypes.RATED,
    data: usersRatings.dataValues
  });
};

export {
  followEvent,
  articleEvent,
  commentEvent,
  likesEvents,
  ratingEvent
};
