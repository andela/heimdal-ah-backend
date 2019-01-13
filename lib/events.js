import eventEmitter from '../helpers/eventEmitter';
import eventTypes from '../events/eventTypes';
import FollowersModelQuery from './FollowersModelQuery';
import ArticleQueryModel from './ArticleQueryModel';
import models from '../models';

const { comments } = models;

const articleEvent = async (info) => {
  const { userId, payload, newArticle } = info;

  const allReturnedFollowers = await FollowersModelQuery
    .findAllFollowing(userId);

  allReturnedFollowers.forEach((follower) => {
    eventEmitter.emit(eventTypes.POST_ARTICLE_NOTIFICATION, {
      to: follower.dataValues.followerId,
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
    commentInfo,
    userId,
    comment
  } = info;
  const recipient = await ArticleQueryModel.getArticleByIdentifier({ id: articleId });
  const users = await comments.findAll({
    where: commentInfo,
    attributes: ['userId']
  });

  let userIds = users.map(user => user.userId);
  userIds.push(recipient.userId);
  userIds = [...new Set(userIds)];
  const { dataValues: { title, slug } } = recipient;

  userIds.forEach((notifyUserId) => {
    eventEmitter.emit(eventTypes.COMMENT_NOTIFICATION_EVENT, {
      to: {
        userId: notifyUserId,
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

const likesEvents = (payload, likes) => {
  const { articleOwner, articleId, userId } = payload;

  eventEmitter.emit(eventTypes.ARTICLE_NOTIFICATION_EVENT, {
    to: articleOwner.dataValues,
    from: userId,
    articleId,
    type: eventTypes.LIKED,
    data: likes.dataValues
  });
};

const followEvent = (info) => {
  const { intFollowId, userId, followUser } = info;
  eventEmitter.emit(eventTypes.FOLLOW_INTERACTION_EVENT, {
    to: intFollowId,
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
  eventEmitter.emit(eventTypes.RATING_INTERACTION_EVENT, {
    to: articleOwner.dataValues,
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
