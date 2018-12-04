import jwtDecode from 'jwt-decode';
import model from '../models';
import Response from '../helpers/statusResponse';

const { profiles } = model;

/**
 * @description - This class is all about users
 * @param {object} req
 * @param {object} res
 * @returns {class} Users
 */
class ProfilesController {
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
        Response.created(res, {
          message: 'Users profile created succesfully',
          profile: usersProfile
        });
      }
    } catch (error) {
      Response.internalServerError(res, {
        message: 'users profile not created succesfully, please try again',
        error: {
          body: [
            `Internal server error => ${error}`
          ]
        }
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
        Response.notfound(res, {
          message: 'Users profile not found',
          profile: usersProfile
        });
      } else {
        Response.success(res, {
          message: 'Users profile returned succesfully',
          profile: usersProfile
        });
      }
    } catch (error) {
      Response.internalServerError(res, {
        message: 'users profile not returned succesfully, please try again',
        error: {
          body: [
            `Internal server error => ${error}`
          ]
        }
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
    const userToken = req.app.get('token');
    const decoded = jwtDecode(userToken).username;
    if (decoded !== req.params.username) {
      Response.unauthorized(res, {
        errors: {
          body: [
            'You cannot edit another persons profile'
          ]
        }
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
            Response.success(res, {
              message: 'Users profile updated successfully',
              profile: updatedUsersProfile
            });
          }
        } catch (error) {
          Response.internalServerError(res, {
            message: 'users profile not returned succesfully, please try again',
            error: {
              body: [
                `Internal server error => ${error}`
              ]
            }
          });
        }
      }
    } catch (error) {
      Response.internalServerError(res, {
        message: 'users profile not returned succesfully, please try again',
        error: {
          body: [
            `Internal server error => ${error}`
          ]
        }
      });
    }
  }
}

export default ProfilesController;
