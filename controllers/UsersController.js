// import jwtDecode from 'jwt-decode';
// import jwt from 'jsonwebtoken';
import model from '../models';
import { profileStatusResponseOk, profileStatusResponseError } from '../middlewares/UsersMiddleware';

const { profiles } = model;

/**
 * @description - This class is all about users
 * @param {object} req
 * @param {object} res
 * @returns {class} Users
 */
class UsersController {
  /**
   * @description - This method takes care of creating a users profile after registration
   * @param {object} req
   * @param {object} res
   * @returns {object} Created Users Profile
   */
  static async createProfile(req, res) {
    try {
      const usersProfile = await profiles.create({
        username: req.body.username,
        biodata: req.body.biodata,
        image: req.body.image,
        address: req.body.address,
        dateofbirth: req.body.dateofbirth
      });
      if (usersProfile) {
        profileStatusResponseOk(res, 201, 'Users profile created succesfully', usersProfile);
      }
    } catch (error) {
      profileStatusResponseError(res, 500, 'users profile not created succesfully, please try again', {
        body: [
          `Internal server error => ${error}`
        ]
      });
    }
  }

  /**
   * @description - This method takes care of a user viewing his or other people's profile
   * @param {object} req
   * @param {object} res
   * @returns {object} Users Profile
   */
  static async viewProfile(req, res) {
    try {
      const usersProfile = await profiles.findOne({
        where: {
          username: req.params.username
        }
      });
      if (usersProfile === null) {
        profileStatusResponseOk(res, 404, 'Users profile not found', usersProfile);
      } else {
        profileStatusResponseOk(res, 200, 'Users profile returned succesfully', usersProfile);
      }
    } catch (error) {
      profileStatusResponseError(res, 500, 'users profile not returned succesfully, please try again', {
        body: [
          `Internal server error => ${error}`
        ]
      });
    }
  }

  /**
   * @description - This method takes care of updating a user's profile
   * @param {object} req
   * @param {object} res
   * @returns {object} Updated Users Profile
   */
  static async updateProfile(req, res) {
    // To be used when users have registered and provided token to login
    // const token = req.headers['x-access-token'];

    if (req.body.userToken !== 'token') {
      profileStatusResponseError(res, 401, '', {
        body: [
          'You cannot edit another persons profile'
        ]
      });
    }

    try {
      const usersProfile = await profiles.findOne({
        where: {
          username: req.params.username
        }
      });
      if (usersProfile) {
        try {
          const updatedUsersProfile = await usersProfile.update({
            biodata: req.body.biodata || usersProfile.biodata,
            image: req.body.image || usersProfile.image,
            address: req.body.address || usersProfile.address,
            dateofbirth: req.body.dateofbirth || usersProfile.dateofbirth
          });
          if (updatedUsersProfile) {
            profileStatusResponseOk(res, 200, 'Users profile updated succesfully', updatedUsersProfile);
          }
        } catch (error) {
          profileStatusResponseError(res, 500, 'users profile not returned succesfully, please try again', {
            body: [
              `Internal server error => ${error}`
            ]
          });
        }
      }
    } catch (error) {
      profileStatusResponseError(res, 500, 'users profile not returned succesfully, please try again', {
        body: [
          `Internal server error => ${error}`
        ]
      });
    }
  }
}

export default UsersController;
