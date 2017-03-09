'use strict';

const async = require ('async');

const models = require ('../../../models/index');
const config = require ('../../../config/config');
const log    = require ('../../../libs/winston')(module);
const jwt    = require('jwt-simple');

const secret = require('../../../config/config').secret;

const userModel = models.userModel;

let signUpController = {};

function buildResponse(statusCode, data, res) {
  if (statusCode === 200) {
    return res.status(200).json({
      data: data
    })
  } else if (statusCode === 404) {
    return res.status(404).json({
      data: data
    })
  }
}

signUpController.saveUser = (req, res) => {
  userModel.findOne({name: req.body.name})
    .then(user => {
      if (user) {
        throw ('That name is already taken');
      } else {
        const user = new userModel({
          name: req.body.name,
          fullname: req.body.fullname,
          password: req.body.password,
          initials: req.body.initials,
          email: req.body.email
        });

        return user.save();
      }
    })
    .then(user => buildResponse(200, jwt.encode(user._id, secret), res))
    .catch(err => buildResponse(404, err, res));
};

module.exports = signUpController;